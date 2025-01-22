import express from "express";

import { createOrganizationHandler,
         getOrganizationsHandler,
         getOrganizationByIdHandler,
         updateOrganizationHandler,
         deleteOrganizationHandler,} from "../controllers/organizationControllers.js";

const router = express.Router();

router.post("/", createOrganizationHandler);
router.get("/", getOrganizationsHandler);
router.get("/:id", getOrganizationByIdHandler);
router.put("/:id", updateOrganizationHandler);
router.delete("/:id", deleteOrganizationHandler);

export default router;