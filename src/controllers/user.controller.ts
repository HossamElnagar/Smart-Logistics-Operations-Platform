import type { request, Request,response,Response } from "express";

import { UserService } from "../services/user.services.js";

const userServices = new UserService();

export class userController {
    async create(req:Request, res: Response) {
        try{
            const user = await userServices.createUser(req.body);
            return res.status(201).json({
                success: true,
                data: user
            })
        } catch (error:any){
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    async getById(req: Request, res:Response){
      try{
            const { id } = req.params;
            // extract id and check if exist
            if (!id) {
            return res.status(400).json({
                success: false,
                message: "User id is required",
            });
            }
            // type must be string as services
            if (typeof id !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid id",
            });
            }
            const user = 
                await userServices.getUserById(
                    id
                )
                
            return res.status(200).json({
                success: true,
                data: user
            })
    }catch(error: any){
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }}


    async getCompanyUsers(req:Request,res:Response){
        try{
            const { companyId } = req.params;
            // extract id and check if exist
            if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company id is required",
            });
            }
            // type must be string as services
            if (typeof companyId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid id",
            });
        }
            const users = await userServices.getCompanyUsers(
                companyId)
            
            return res.status(200).json({
                success: true,
                data: users
            })            
        }catch(error:any){
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    
    }
    async update(req:Request,res:Response){
        try{
            const { id } = req.params;
        // extract id and check if exist
        if (!id) {
        return res.status(400).json({
            success: false,
            message: "User id is required",
        });
        }
        // type must be string as services
        if (typeof id !== "string") {
        return res.status(400).json({
            success: false,
            message: "Invalid id",
        });
        }
        const user = await userServices.updateUser(
            id,
            req.body
        )
        return res.status(200).json({
        success: true,
        data: user
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async delete(
    req: Request,
    res: Response
  ) {

    try {
        const { id } = req.params;
        // extract id and check if exist
        if (!id) {
        return res.status(400).json({
            success: false,
            message: "User id is required",
        });
        }
        // type must be string as services
        if (typeof id !== "string") {
        return res.status(400).json({
            success: false,
            message: "Invalid id",
        });
        }
      await userServices.deleteUser(id)

      return res.status(200).json({
        success: true,
        message: "User deleted successfully"
      });

    } catch (error: any) {

      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }
}