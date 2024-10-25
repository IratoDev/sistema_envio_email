
import { Router, Request, Response } from "express";

import { EnvioEmailController } from "./controllers/EnvioEmail/ControllerEnvioEmail";

const router = Router();

//rota envio de email
router.post("/envio", new EnvioEmailController().handle)

export{router}