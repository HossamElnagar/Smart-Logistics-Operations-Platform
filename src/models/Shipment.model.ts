// src/models/shipment.model.ts

import mongoose, { Schema, Document } from "mongoose";

import { ShipmentStatus } from "../types/shipment.type.js";

export interface IShipment extends Document {
  companyId: mongoose.Types.ObjectId;

  trackingNumber: string;

  customerName: string;

  customerPhone: string;

  pickupAddress: string;

  deliveryAddress: string;

  currentLocation?: string;

  status: ShipmentStatus;

  assignedDriver?: mongoose.Types.ObjectId;

  assignedVehicle?: mongoose.Types.ObjectId;

  estimatedDeliveryTime?: Date;

  deliveredAt?: Date;

  createdBy: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const shipmentSchema = new Schema<IShipment>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true, // for accelerate the search 
    },

    trackingNumber: {
      type: String,
      required: true,
      unique: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    customerPhone: {
      type: String,
      required: true,
    },

    pickupAddress: {
      type: String,
      required: true,
    },

    deliveryAddress: {
      type: String,
      required: true,
    },

    currentLocation: String,

    status: {
      type: String,
      enum: Object.values(ShipmentStatus),
      default: ShipmentStatus.CREATED,
    },

    assignedDriver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    assignedVehicle: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
    },

    estimatedDeliveryTime: Date,

    deliveredAt: Date,

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


shipmentSchema.index({ companyId: 1 });
shipmentSchema.index({ assignedDriverId: 1 });
shipmentSchema.index({ status: 1 });

export const Shipment = mongoose.model<IShipment>(
  "Shipment",
  shipmentSchema
);