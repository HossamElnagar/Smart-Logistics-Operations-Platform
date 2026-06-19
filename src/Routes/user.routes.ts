// routes/user.routes.ts

import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const router = Router();

const controller = new userController();

router.post(
  "/",
  controller.create.bind(controller)
);

router.get(
  "/company/:companyId",
  controller.getCompanyUsers.bind(controller)
);

router.get(
  "/:id",
  controller.getById.bind(controller)
);

router.patch(
  "/:id",
  controller.update.bind(controller)
);

router.delete(
  "/:id",
  controller.delete.bind(controller)
);

export default router;