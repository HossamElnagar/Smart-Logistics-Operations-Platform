import mongoose ,{Schema, Document} from "mongoose";
import {companyPlan} from "../types/company.type.js"



export interface ICompany extends Document{
    name: string;
    slug: string;
    email: string;
    phone?: string; // ? refer to optional not required
    industry: string;
    logo?: string;
    isActive: boolean;
    subscriptionPlan: companyPlan;
    ownerId: mongoose.Types.ObjectId;

    createdAt: Date;
    updatedAt: Date;
}

const companySchema = new Schema<ICompany>(
    {
        name:{
            type:String,
            required:true
        },
        slug:{
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            unique:true
        },
        phone: String
        ,
        industry: {
            type:String,
            default: "LOGISTICS",
        },
        logo:String,
        
        isActive: {
            type: Boolean,
            default: true
        },
        subscriptionPlan:{
            type:String,
            enum: Object.values(companyPlan),
            default: companyPlan.BASIC,
        },
        ownerId:{
            type: Schema.Types.ObjectId,
            ref:"User",
        },



},{timestamps:true}

)

export const Company = mongoose.model<ICompany>(
    "Company",
    companySchema
)