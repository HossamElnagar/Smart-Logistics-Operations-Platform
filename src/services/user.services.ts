import { UserRepository } from "../repositories/user.repository.js";
import bcrypt from "bcrypt";

const userRepo = new UserRepository();

export class UserService {
    async createUser(data: any){
        // check email if exist
        const existingUser = 
            await userRepo.findByEmail(data.email);

        if(existingUser){
            throw new Error("User already exists");
        }
        // hashing password
        const hashedPassword = 
           await bcrypt.hash(data.password,10)
        //create user
        return await userRepo.create({
            ...data,
            password:hashedPassword
        })
        
    }

    async getUserById(id:string){
        // find user
        const user = await userRepo.findById(id);
        // if not exist
        if(!user){
            throw new Error("user not found");
        }
        // if exist
        return user;
    }



    async getCompanyUsers(companyId: string){
        return await userRepo.findAllByCompany(companyId);
    }


    async updateUser(id: string, data:any){

        // find by id and update
        const user = 
            await userRepo.update(id, data);

        if(!user){
            throw new Error("user not found");
        }
        
        return user;
    }

    async deleteUser(id: string){
        //check if user exist
        const user =  userRepo.findById(id) 
          
        if(!user){
            throw new Error("User not found");
        }

        await userRepo.deleteById(id);
        
        return user;
    }
}