import { model, Schema } from 'mongoose';
export const SubscriptionPlanSchema = new Schema({
    title: { type: 'String', required: true },
    price: { type: 'Number', required: true },
    priceDescription: { type: 'String', required: true },
    features: { type: ['String'], required: true },
    isPopular: { type: 'Boolean', default: false },
    buttonText: { type: 'String', required: true }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
export const SubscriptionPlan = model('SubscriptionPlan', SubscriptionPlanSchema);
