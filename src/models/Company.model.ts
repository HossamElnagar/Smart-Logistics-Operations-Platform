import mongoose ,{Schema, Document} from "mongoose";
import {companyPlan} from "../types/company.type.js"




export interface ICompany extends Document{
    companyName: string;
    slug: string;
    email: string;
    companyEmail: string;
    founderName: string;
    phone?: string; 
    industry: string;
    logo?: string;
    isActive: boolean;
    subscriptionPlan: companyPlan;
    ownerId: mongoose.Types.ObjectId;

}

const companySchema = new Schema<ICompany>(
    {
        companyName:{
            type:String,
            trim:true,
            required:true,
        },
        slug:{
            type: String,
            required: true,
            trim:true,
            unique: true,
        },
        companyEmail:{
            type: String,
            required: true,
            trim:true,
            unique:true,
        },
        founderName:{
            type:String,
            required: true,
            trim:true,
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
            required: true,
        },



},{timestamps:true}

)

//1 means Ascending Index 
//-1 means Descending Index
companySchema.index({slug: 1})
companySchema.index({CompanyEmail: 1})


export const Company = mongoose.model<ICompany>(
    "Company",
    companySchema
)