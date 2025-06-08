import cron from "node-cron";
import { sendEmailToBrevo, removeEmailFromBrevo } from "../utils/brevo.js";
import Subscription from "../models/subscriptionModel.js";
import { createReminderEmailHtml } from "../utils/mailHtml.js";
import sendEmail from "../utils/sendMail.js";

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

  // ✅ Activate subscriptions
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
          await removeEmailFromBrevo(email);
        } catch (err) {
          console.warn(`Failed to remove ${email} from Brevo:`, err.message);
        }

        // Then add to the correct list
        try {
          await sendEmailToBrevo(email, listId);
          sub.status = "active";
        } catch (err) {
          console.error(`Failed to add ${email} to Brevo:`, err.message);
        }
        try{
          await sub.save();
          console.log(`Activated: ${email}`);
        }catch(err){
          console.log("failed to save subscription after add", err);
        }
      } else {
        console.warn(`No list ID found for plan "${planTitle}"`);
      }
    }
  } catch (err) {
    console.error("error to find subscription for add :", err.message);
  }

  try {
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
          console.log("failed to save subscription after remove");
        }
      }
    }

    console.log(" Subscription cron job completed.\n");
  } catch (err) {
    console.error("error to find subscription for remove ", err.message);
  }
});

// 📬 Reminder Email Cron Job - Ending within next 3 days
cron.schedule("0 0 * * *", async () => {
  console.log("Running subscription reminder email cron...");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(today.getDate() + 3);
  threeDaysFromNow.setHours(23, 59, 59, 999);

  try {
    const expiringSoon = await Subscription.find({
      endingDate: { $gte: today, $lte: threeDaysFromNow },
      status: "active",
      paid: true,
    }).populate("user servicePlan");

    for (const sub of expiringSoon) {
      const email = sub.user?.email;
      const fullName = sub.user?.fullName;
      const planTitle = sub.servicePlan?.title;
      const endDate = sub.endingDate.toLocaleDateString();

      if (email && fullName && planTitle) {
        const subject = `⏰ Reminder: Your ${planTitle} subscription expires on ${endDate}`;
        const html = createReminderEmailHtml({ fullName, planTitle, endDate });

        try {
          await sendEmail(email, subject, html);
          console.log(`Reminder sent to: ${email}`);
        } catch (err) {
          console.warn(`Failed to send reminder to ${email}:`, err.message);
        }
      }
    }

    console.log("Reminder email cron job completed.\n");
  } catch (err) {
    console.error("Error finding subscriptions for reminder:", err.message);
  }
});

