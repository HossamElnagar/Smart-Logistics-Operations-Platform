import joi from "joi";
import { ShipmentStatus } from "../types/shipment.type.js";
// MongoDB ObjectId regex pattern (24 hex characters)
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export const createShipmentSchema = joi.object({
  companyId: joi.string().pattern(objectIdPattern).required().messages({
    "string.pattern.base": "Invalid companyId format.",
    "any.required": "companyId is required."
  }),

  trackingNumber: joi.string().required().messages({
    "any.required": "Tracking number is required."
  }),

  customerName: joi.string().min(3).max(200).required().messages({
    "string.min": "Customer name must be at least 3 characters long.",
    "string.max": "Customer name must be max 200 characters long.",
    "any.required": "Customer name is required."
  }),

  customerPhone: joi.string().regex(/^[0-9]+$/).required().messages({
    "string.pattern.base": "Customer phone must contain digits only.",
    "any.required": "Customer phone is required."
  }),

  pickupAddress: joi.string().required().messages({
    "any.required": "Pickup address is required."
  }),

  deliveryAddress: joi.string().required().messages({
    "any.required": "Delivery address is required."
  }),

  createdBy: joi.string().pattern(objectIdPattern).required().messages({
    "string.pattern.base": "Invalid creator user ID format.",
    "any.required": "createdBy ID is required."
  }),

  // optional
  currentLocation: joi.string().optional(),
  
  status: joi.string()
    .valid(...Object.values(ShipmentStatus))
    .default(ShipmentStatus.CREATED)
    .optional(),
    
  assignedDriver: joi.string().pattern(objectIdPattern).optional(),
  assignedVehicle: joi.string().pattern(objectIdPattern).optional(),
  //ISO 8601  : 2026-05-30T16:28:44.000Z
  estimatedDeliveryTime: joi.date().iso().optional(),
  deliveredAt: joi.date().iso().optional()
});