import joi from "joi";
import { companyPlan } from "../types/company.type.js";

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export const createCompanySchema = joi.object({
    companyName: joi.string().min(3).max(200)
    .required()
    .messages({
        "string.min":"Company name must be at least 3 characters long.",
        "string.max": "Company name must be max 200 characters long.",
        "any.required":"company name is required"
    }),
    slug: joi.string().min(3).max(200).required()
    .messages({
        "string.min":"slugan name must be at least 3 characters long.",
        "string.max": "slugan must be max 200 characters long.",
        "any.required": "slugan is required for URL generation."
    }),
    comapnyEmail: joi.string().email().required()
    .messages({
        "string.email": "Inavalid email format",
        "any.required" : "Company email is required"
    }),
    founderName: joi.string().min(10).max(100).required().trim(),

    phone: joi.string().regex(/^[0-9]+$/).optional()
    .messages({
        "string.pattern.base" :"phone number must contain digit only"  
    }),
    industry: joi.string().default("LOGISTICS").optional(),

  logo: joi.string().uri().optional().messages({
    "string.uri": "Logo must be a valid URL string."
  }),


    // uri  Uniform Resource Identifier  
    // check if it is valid url like 
    //https://logistics-system.com/logos/company-a.png
    //http://localhost:3000/assets/logo.jpg

  subscriptionPlan: joi.string()
    .valid(...Object.values(companyPlan))
    .default(companyPlan.BASIC)
    .optional()
    .messages({
      "any.only": "Invalid subscription plan provided."
    }),

  ownerId: joi.string().pattern(objectIdPattern).required().messages({
    "string.pattern.base": "Invalid ownerId format. Must be a valid ObjectId.",
    "any.required": "Owner ID is required to link the company to its creator."
  }),

  // isActive logic is handled by system default (true), usually not passed in creation
  isActive: joi.boolean().default(true).optional()
});

// 2. Update Company Validation (When editing company settings)
export const updateCompanyValidation = joi.object({
  name: joi.string().min(2).max(100).optional(),
  slug: joi.string().min(2).max(100).optional(),
  email: joi.string().email().optional(),
  phone: joi.string().regex(/^[0-9]+$/).optional(),
  industry: joi.string().optional(),
  logo: joi.string().uri().optional(),
  
  // These fields are optional during update but highly sensitive
  subscriptionPlan: joi.string().valid(...Object.values(companyPlan)).optional(),
  isActive: joi.boolean().optional()

})
