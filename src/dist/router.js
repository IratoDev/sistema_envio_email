"use strict";
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var ControllerEnvioEmail_1 = require("./controllers/EnvioEmail/ControllerEnvioEmail");
var router = express_1.Router();
exports.router = router;
//rota envio de email
router.post("/envio", new ControllerEnvioEmail_1.EnvioEmailController().handle);
