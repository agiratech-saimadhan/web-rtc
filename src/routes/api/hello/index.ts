import { Router } from "express";
import handleHello from "../../../handlers/handleHello";

const router: Router = Router();

router.get("/hello", handleHello);

export default router;
