import Subscription from "../models/subscriptionModel.js";
import User from "../models/userModel.js";
import { sendEmailToBrevo, removeEmailFromBrevo } from "../utils/brevo.js";

export const addTobrevo = async (req, res) => {
  if (!req.body.user) {
    res.status(400).json({ success: false, message: "user is required" });
  }
  console.log(req.body)
  try {
    const user = req.body.user;
    const email = user.email;

    const subscription = await Subscription.findOne({ user: user._id });
    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "not found subscription" });
    }

    let listId;
    if (subscription.serviceType == "ScholarTrack") {
      listId = process.env.SCHOLARTRACK_EMAIL_LIST_ID;
    } else if (subscription.serviceType == "CareerCatch") {
      listId = process.env.CAREERCATCH_EMAIL_LIST_ID;
    } else if (subscription.serviceType == "All-Access") {
      listId = process.env.ALL_ACCESS_EMAIL_LIST_ID;
    }

    await sendEmailToBrevo(email, Number(listId));

    await User.findByIdAndUpdate(user._id, { isAdded: true }, { runValidators: false });

    res.status(200).json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error("Subscription Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromBrevo = async (req, res) => {
  if (!req.body.user) {
    res.status(400).json({ success: false, message: "user is required" });
  }
  const user = req.body.user;
  const email = user.email;

  try {
    const subscription = await Subscription.findOne({ user: user._id });
    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "not found subscription" });
    }

    let listId;
    if (subscription.serviceType == "ScholarTrack") {
      listId = process.env.SCHOLARTRACK_EMAIL_LIST_ID;
    } else if (subscription.serviceType == "CareerCatch") {
      listId = process.env.CAREERCATCH_EMAIL_LIST_ID;
    } else if (subscription.serviceType == "All-Access") {
      listId = process.env.ALL_ACCESS_EMAIL_LIST_ID;
    }

    await removeEmailFromBrevo(email, Number(listId));

    await User.findByIdAndUpdate(user._id, { isAdded: false }, { runValidators: false });

    res
      .status(200)
      .json({ success: true, message: "Email removed from Brevo" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
