import mongoose, { Document, Schema } from 'mongoose';

export interface ISubscriber extends Document {
  name: string;
  email: string;
  subscribedAt: Date;
}

const SubscriberSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create index for email for faster lookups
SubscriberSchema.index({ email: 1 });

export default mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);