import { Router } from "express";
import { CompanyController } from "../controllers/company.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createCompanySchema,
  updateCompanySchema,
} from "../validations/company.val.js"

const router = Router();
const controller = new CompanyController();

router.post(
  "/",
  validate(createCompanySchema),
  controller.create.bind(controller)
);

router.get("/", controller.getAll.bind(controller));

router.get("/:id", controller.getById.bind(controller));

router.patch(
  "/:id",
  validate(updateCompanySchema),
  controller.update.bind(controller)
);

router.delete("/:id", controller.delete.bind(controller));

export default router;