import { Router } from "express";
import UserDeviceController from "./user-device.controller";

const router = Router();

router.get("/", UserDeviceController.getAllDevices);
router.get("/:id", UserDeviceController.getDeviceById);
router.post("/", UserDeviceController.addDevice);
router.put("/:id", UserDeviceController.updateDevice);
router.delete("/:id", UserDeviceController.deleteDevice);

export default router;
