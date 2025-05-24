import SSLCommerzPayment from "sslcommerz-lts";
import { v4 as uuidv4 } from "uuid";
import Subscription from "../models/subscriptionModel.js";
import User from "../models/userModel.js"; // Make sure you have this
import sendEmail from "../utils/sendMail.js";

const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASSWORD;
const is_live = process.env.SSL_IS_LIVE === "true";

// INITIATE PAYMENT
export const payment = async (req, res) => {
  const { price } = req.body;
  const { _id, fullName, email } = req.user;

  if (!price || price <= 0) {
    return res.status(400).json({ success: false, message: "Invalid price" });
  }

  const tran_id = "TXN_" + uuidv4();

  try {
    await Subscription.create({
      user: _id,
      tran_id,
      amount: price,
      status: "Pending",
    });

    const data = {
      total_amount: price,
      currency: "BDT",
      tran_id,

      success_url: `${process.env.BACKEND_URL}/api/payment/success/${tran_id}`,
      fail_url: `${process.env.BACKEND_URL}/api/payment/fail/${tran_id}`,
      cancel_url: `${process.env.BACKEND_URL}/api/payment/cancel/${tran_id}`,
      ipn_url: `${process.env.BACKEND_URL}/api/payment/ipn/${tran_id}`,

      shipping_method: "NO",
      product_name: "Newsletter Subscription",
      product_category: "Digital Service",
      product_profile: "non-physical-goods",

      cus_name: fullName || "Customer Name",
      cus_email: email || "customer@example.com",
      cus_add1: "N/A",
      cus_add2: "N/A",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "N/A",
      cus_fax: "N/A",

      ship_name: fullName || "Customer Name",
      ship_add1: "N/A",
      ship_add2: "N/A",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: "1000",
      ship_country: "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);
    const GatewayPageURL = apiResponse?.GatewayPageURL;

    if (!GatewayPageURL) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to get gateway URL" });
    }

    res.status(200).json({ success: true, url: GatewayPageURL });
  } catch (err) {
    console.error("Payment Init Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Payment initialization failed." });
  }
};

// HANDLE SUCCESS
export const handleSuccess = async (req, res) => {
  const { tran_id } = req.params;

  try {
    const subscription = await Subscription.findOne({ tran_id }).populate("user");

    if (!subscription) {
      return res.status(404).send("Subscription not found");
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    subscription.status = "Success";
    subscription.startingDate = startDate;
    subscription.endingDate = endDate;
    await subscription.save();

    if (subscription.user) {
      await User.findByIdAndUpdate(subscription.user, { isSubscribed: true });
      await sendEmail("subscription", {user: subscription.user, subscription});
    } else {
      console.warn(
        `Subscription with tran_id ${tran_id} has no associated user.`
      );
      return res.status(400).send("Invalid subscription: No associated user.");
    }

    res.redirect(
      `${process.env.FRONTEND_URL}/payment/success?tran_id=${tran_id}`
    );
  } catch (err) {
    console.error("Success Handler Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

// HANDLE FAIL
export const handleFail = async (req, res) => {
  const { tran_id } = req.params;

  try {
    await Subscription.findOneAndUpdate({ tran_id }, { status: "Failed" });
    res.redirect(`${process.env.FRONTEND_URL}/payment/fail?tran_id=${tran_id}`);
  } catch (err) {
    console.error("Fail Handler Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

// HANDLE CANCEL
export const handleCancel = async (req, res) => {
  const { tran_id } = req.params;

  try {
    await Subscription.findOneAndUpdate({ tran_id }, { status: "Cancelled" });
    res.redirect(
      `${process.env.FRONTEND_URL}/payment/cancel?tran_id=${tran_id}`
    );
  } catch (err) {
    console.error("Cancel Handler Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

// HANDLE IPN (Instant Payment Notification)
export const handleInstantPaymentNotification = async (req, res) => {
  const data = req.body;
  const tran_id = data.tran_id;

  try {
    if (data.status === "VALID") {
      await Subscription.updateOne({ tran_id }, { status: "Success" });
    } else {
      await Subscription.updateOne({ tran_id }, { status: "Failed" });
    }
    res.status(200).json({ received: true });
  } catch (err) {
    console.error("IPN Handler Error:", err);
    res.status(500).json({ success: false });
  }
};
