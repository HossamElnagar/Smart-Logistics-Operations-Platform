import joi from "joi";
const objectIdPattern = /^[0-9a-fA-F]{24}$/;
import {
    IncidentSeverity,
    IncidentEntityType,
} from "../types/incident.type.js"

export const createIncidentSchema = joi.object({
 title:joi.string().min(3).max(150).required().messages({
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title cannot exceed 150 characters.",
    "any.required": "Title is required."
 }),
 description: joi.string().min(5).max(500).required().messages({
    "string.min": "Description must be at least 5 characters long.",
    "string.max": "Description cannot exceed 500 characters.",
    "any.required": "Description is required."
 }),
 severity: joi.string().
 valid(...Object.values(IncidentSeverity)).
 required().messages({
    "any.only": "Invalid severity level provided.",
    "any.required" : "Severity is required."
 }),
 relaltedEntityType: joi.string()
 .valid(...Object.values(IncidentEntityType)). //any.only
 required().messages({
    "any.only": "Invalid related entity type. ",
    "any.required": "Related entity type is required."
 }),
 relatedEntityId: joi.string().pattern(objectIdPattern).required().messages({
    "string.pattern.base": "Invalid Related Entity Id format. must be a valid format.",
    "any.required": "Related Entity Id is required"
 }),
 assignedTo: joi.string().pattern(objectIdPattern).optional().messages({
    "string.pattern.base": "Invalid assignedTo user ID format."
 })
})