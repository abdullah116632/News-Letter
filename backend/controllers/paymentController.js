import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Subscription from "../models/subscriptionModel.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendMail.js";

// INITIATE PAYMENT
export const subscribe = async (req, res) => {
  const { price, serviceType } = req.body;
  const { _id, fullName, email } = req.user;

  if (!price || price <= 0 || !serviceType) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  const existing = await Subscription.findOne({ user: _id });
  const now = new Date();
  if (
    existing &&
    existing.status === "Success" &&
    existing.endingDate &&
    existing.endingDate > now
  ) {
    return res.status(200).json({
      success: false,
      message: "Already subscribed",
      data: { subscription: existing },
    });
  }

  const subscriptionId = "SUB_" + uuidv4();

  const options = {
    method: "POST",
    url: process.env.UDDOKTAPAY_CHECKOUT_API_URL,
    headers: {
      accept: "application/json",
      "RT-UDDOKTAPAY-API-KEY": process.env.UDDOKTAPAY_API_KEY,
      "content-type": "application/json",
    },
    data: {
      full_name: fullName,
      email: email,
      amount: price.toString(),
      metadata: {
        user_id: _id.toString(),
        subscription_id: subscriptionId,
        type: "subscribe",
        serviceType,
      },
      redirect_url: `${process.env.BACKEND_URL}/api/payment/success`,
      return_type: "POST",
      cancel_url: `${process.env.BACKEND_URL}/api/payment/cancel`,
      webhook_url: `${process.env.BACKEND_URL}/api/payment/webhook`,
    },
  };

  try {
    const response = await axios.request(options);
    const redirectUrl = response.data.payment_url;

    // Save subscription with status pending
    await Subscription.findOneAndUpdate(
      { user: _id },
      {
        user: _id,
        subscriptionId,
        amount: price,
        serviceType,
        status: "Pending",
        invoice_id: null,
        startingDate: null,
        endingDate: null,
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      url: redirectUrl,
    });
  } catch (err) {
    console.error("Subscribe Error:", err.message);
    res.status(500).json({ success: false, message: "Subscription failed" });
  }
};

// INITIATE RENEW PAYMENT
export const renew = async (req, res) => {
  console.log("request come")
  const { price, serviceType } = req.body;
  const { _id, fullName, email } = req.user;

  if (!price || price <= 0 || !serviceType) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  const subscription = await Subscription.findOne({ user: _id });

  if (!subscription || subscription.status !== "Success") {
    return res
      .status(400)
      .json({ success: false, message: "No active subscription to renew" });
  }

  // Use the existing subscriptionId
  const existingSubscriptionId = subscription.subscriptionId;

  const updatedPrice = Number(subscription.amount) + Number(price);

  const options = {
    method: "POST",
    url: process.env.UDDOKTAPAY_CHECKOUT_API_URL,
    headers: {
      accept: "application/json",
      "RT-UDDOKTAPAY-API-KEY": process.env.UDDOKTAPAY_API_KEY,
      "content-type": "application/json",
    },
    data: {
      full_name: fullName,
      email: email,
      amount: price.toString(), // Only the new price is paid now
      metadata: {
        user_id: _id.toString(),
        subscription_id: existingSubscriptionId,
        type: "renew",
        serviceType,
      },
      redirect_url: `${process.env.BACKEND_URL}/api/payment/success`,
      return_type: "POST",
      cancel_url: `${process.env.BACKEND_URL}/api/payment/cancel`,
      webhook_url: `${process.env.BACKEND_URL}/api/payment/webhook`,
    },
  };

  try {
    const response = await axios.request(options);
    const redirectUrl = response.data.payment_url;

    // Update status to pending but keep subscriptionId and update total amount
    // subscription.status = "Pending";
    subscription.invoice_id = null;
    subscription.amount = updatedPrice;
    subscription.serviceType = serviceType;
    await subscription.save();

    res.status(200).json({
      success: true,
      url: redirectUrl,
    });
  } catch (err) {
    console.error("Renew Error:", err.message);
    res.status(500).json({ success: false, message: "Renewal failed" });
  }
};

// HANDLE SUCCESS
export const handleSuccess = async (req, res) => {
  const invoiceId = req.body.invoice_id;

  try {
    const options = {
      method: "POST",
      url: process.env.UDDOKTAPAY_VERIFY_API_URL,
      headers: {
        accept: "application/json",
        "RT-UDDOKTAPAY-API-KEY": process.env.UDDOKTAPAY_API_KEY,
        "content-type": "application/json",
      },
      data: { invoice_id: invoiceId },
    };

    const response = await axios.request(options);
    const paymentData = response.data;
    const userId = paymentData?.metadata?.user_id;
    const subscriptionType = paymentData?.metadata?.type; // 'subscribe' or 'renew'
    const serviceType = paymentData?.metadata?.serviceType;

    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const subscription = await Subscription.findOne({ user: userId });
    const now = new Date();

    if (subscriptionType === "subscribe") {
      const newEnd = new Date(now);
      newEnd.setMonth(now.getMonth() + 1);

      if (subscription) {
        // Update existing
        subscription.subscriptionId = paymentData?.metadata?.subscription_id;
        subscription.status = "Success";
        subscription.invoice_id = invoiceId;
        subscription.amount = paymentData.amount;
        subscription.startingDate = now;
        subscription.endingDate = newEnd;
        subscription.serviceType = serviceType;

        await subscription?.save();
      } else {
        // Create new
        await Subscription.create({
          user: userId,
          subscriptionId: paymentData?.metadata?.subscription_id,
          amount: paymentData.amount,
          invoice_id: invoiceId,
          status: "Success",
          startingDate: now,
          endingDate: newEnd,
          serviceType,
        });
      }

      await User.findByIdAndUpdate(userId, { isSubscribed: true });
    }

    if (subscriptionType === "renew") {
      if (!subscription || subscription.status !== "Success") {
        return res.status(400).send("No active subscription to renew.");
      }

      const currentEnd =
        subscription.endingDate > now ? subscription.endingDate : now;
      const newEnd = new Date(currentEnd);
      newEnd.setMonth(newEnd.getMonth() + 1);

      subscription.status = "Success";
      subscription.invoice_id = invoiceId;
      subscription.endingDate = newEnd;
      subscription.serviceType = serviceType;

      await subscription.save();
      await User.findByIdAndUpdate(userId, { isSubscribed: true });
    }

    res.redirect(`${process.env.FRONTEND_URL}/payment/success`);
  } catch (err) {
    console.error("Success Handler Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

export const handleCancel = async (req, res) => {
  try {
    // UddoktaPay sends metadata back during cancellation via POST
    const { metadata } = req.body;

    if (!metadata || !metadata.subscription_id) {
      return res.status(400).send("Missing subscription metadata.");
    }

    const subscriptionId = metadata.subscription_id;

    // Find the subscription using subscriptionId from metadata
    const subscription = await Subscription.findOne({ subscriptionId });

    if (!subscription) {
      return res.status(404).send("Subscription not found.");
    }

    // Update status to 'Failed' or 'Canceled'
    subscription.status = "Failed";
    await subscription.save();

    // Redirect user to cancel page or notify cancellation
    res.redirect(`${process.env.FRONTEND_URL}/payment/cancel`);
  } catch (err) {
    console.error("Cancel Handler Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

// HANDLE IPN (Instant Payment Notification)
export const handleWebHook = async (req, res) => {
  // Get the API key from the request headers
  const headerApi = req.headers["rt-uddoktapay-api-key"];

  // Verify the API key
  if (headerApi !== apiKey) {
    res.status(401).send("Unauthorized Action");
    return;
  }

  // Webhook data
  const webhookData = req.body;

  // Handle the webhook data
  console.log("Webhook Data Received:");
  console.log(webhookData);

  // You can now process the data as needed

  res.status(200).send("Webhook received successfully");
};

export const checkSubscriptionStatus = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get most recent subscription for the user
    const subscription = await Subscription.findOne({ user: userId });

    if (!subscription) {
      return res.status(200).json({
        subscribed: false,
        message: "User has no active subscription.",
      });
    }

    const now = new Date();

    if (
      subscription.status === "Success" &&
      subscription.endingDate &&
      new Date(subscription.endingDate) > now
    ) {
      return res.status(200).json({
        subscribed: true,
        status: "active",
        data: {
          subscription,
          daysLeft: Math.ceil(
            (new Date(subscription.endingDate) - now) / (1000 * 60 * 60 * 24)
          ),
        },
      });
    } else {
      return res.status(200).json({
        subscribed: true,
        status: "expired",
        data: {
          subscription,
        },
      });
    }
  } catch (error) {
    console.error("Error checking subscription:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
