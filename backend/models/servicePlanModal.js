import mongoose from 'mongoose';

const servicePlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  focus: { type: String, required: true },
  idealFor: { type: String, required: true },
  features: {
    type: [String],
    required: true,
    validate: [arr => arr.length > 0, 'At least one feature is required']
  },
  price: { type: Number, required: true },
}, {
  timestamps: true,
});

const ServicePlan = mongoose.model('ServicePlan', servicePlanSchema);
export default ServicePlan;
