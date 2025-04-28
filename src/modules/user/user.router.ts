import { Router } from "express";
import UserController from "./user.controller";

const router = Router();

router.get("/", UserController.getAll);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
