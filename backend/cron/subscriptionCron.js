import cron from "node-cron";
import { sendEmailToBrevo, removeEmailFromBrevo } from "../utils/brevo.js";
import Subscription from "../models/subscriptionModel.js";

const listMap = {
  "ScholarTrack.": process.env.SCHOLARTRACK_EMAIL_LIST_ID,
  "CareerCatch.": process.env.CAREERCATCH_EMAIL_LIST_ID,
  "OpT. All-Access": process.env.ALL_ACCESS_EMAIL_LIST_ID,
};

// Run every day at 00:00
cron.schedule("0 0 * * *", async () => {
  console.log("Running daily subscription check...");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const toActivate = await Subscription.find({
      startingDate: { $lte: today },
      status: { $ne: "active" },
      paid: true,
    }).populate("user servicePlan");

    for (const sub of toActivate) {
      const email = sub.user?.email;
      const planTitle = sub.servicePlan?.title;
      const listIdString = listMap[planTitle];
      const listId = Number(listIdString);

      if (email && listId) {
        // Remove from ALL lists first (you might want to call removeEmailFromBrevo multiple times or modify removeEmailFromBrevo to remove from all lists)
        try {
          await removeEmailFromBrevo(email); // optional: handle failure silently
        } catch (err) {
          console.warn(`Failed to remove ${email} from Brevo:`, err.message);
        }

        // Then add to the correct list
        try {
          await sendEmailToBrevo(email, listId);
          sub.status = "active";
          await sub.save();
          console.log(`Activated: ${email}`);
        } catch (err) {
          console.error(`Failed to add ${email} to Brevo:`, err.message);
        }
      } else {
        console.warn(`No list ID found for plan "${planTitle}"`);
      }
    }

    // Expire subscriptions that have ended
    const toExpire = await Subscription.find({
      endingDate: { $lte: today },
      status: "active",
    }).populate("user");

    for (const sub of toExpire) {
      const email = sub.user?.email;
      if (email) {
        try {
          await removeEmailFromBrevo(email);
        } catch (err) {
          console.warn(`Failed to remove expired email ${email}:`, err.message);
        }
        try {
          sub.status = "expired";
          await sub.save();
          console.log(`Expired: ${email}`);
        } catch (err) {
          console.log("failed to save updated subscription");
        }
      }
    }

    console.log(" Subscription cron job completed.\n");
  } catch (err) {
    console.error("Cron job error:", err.message);
  }
});
