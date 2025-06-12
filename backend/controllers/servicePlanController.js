import ServicePlan from "../models/servicePlanModal.js";
import CustomError from "../utils/customErrorClass.js";

export const createServicePlan = async (req, res, next) => {
  try {
    const { title, focus, idealFor, features, price } = req.body;

    if (
      !title ||
      !focus ||
      !idealFor ||
      !features ||
      !Array.isArray(features) ||
      features.length === 0 ||
      price === undefined ||
      price === null
    ) {
      return next(
        new CustomError(
          400,
          "All fields are required and features must be a non-empty array"
        )
      );
    }

    const newPlan = new ServicePlan({
      title,
      focus,
      idealFor,
      features,
      price,
    });
    await newPlan.save();

    res.status(201).json({ success: true, data: newPlan });
  } catch (error) {
    console.error("Error creating service plan:", error.message);
    next(error);
  }
};

export const getAllServicePlans = async (req, res) => {
  try {
    const plans = await ServicePlan.find();
    res.status(200).json({ success: true, data: plans });
  } catch (error) {
    console.error("Error fetching service plans:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
