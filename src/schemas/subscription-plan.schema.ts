import { model, Schema } from 'mongoose';

export interface ISubscriptionPlan {
  title: string;
  price: number;
  interval: 'weekly' | 'monthly' | 'yearly';  // keep this
  isPopular: boolean;
  buttonText: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const SubscriptionPlanSchema = new Schema<ISubscriptionPlan>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    interval: {
      type: String,
      enum: ['weekly', 'monthly', 'yearly'],
      required: true,
    },
    isPopular: { type: Boolean, default: false },
    buttonText: { type: String, required: true }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export const SubscriptionPlan = model<ISubscriptionPlan>('SubscriptionPlan', SubscriptionPlanSchema);
