import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subscriptionId: { type: String, required: true, unique: true },
    invoice_id: {type: String},
    amount: { type: Number, required: true },
    serviceType: {
      type: String,
      enum: ["ScholarTrack", "CareerCatch", "All-Access"],
    },
    status: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },
    startingDate: {
      type: Date,
      default: Date.now()
    },
    endingDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
