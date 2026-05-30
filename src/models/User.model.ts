import mongoose, {Schema, Document} from "mongoose";
import { UserRole } from "../types/user.type.js";

export interface IUser extends Document {
    companyId: mongoose.Types.ObjectId;
    name: String ;
    email: String ; 
    password: String;
    phone?: String;
    role: UserRole;
    isOnline: boolean;
    currentSocketId?: String;
    lastSeen?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser> (
    {
        companyId:{
            type: Schema.Types.ObjectId,
            ref:"Company",
            required: true,
            index: true,

        },
        name:{
            type:String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required:true
        },
        phone: String,
        role:{
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.DRIVER
        },
        isOnline:{
            type:Boolean,
            default: false,
        },
        currentSocketId: String,  //Real-Time event //io.to(user.currentSocketId).emit(...)

        lastSeen: Date,
    },
    {
        timestamps: true,
    }

)

export const User = mongoose.model<IUser>(
    "User",
    userSchema
)