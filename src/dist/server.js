"use strict";
exports.__esModule = true;
var express_1 = require("express");
require("express-async-errors");
var cors_1 = require("cors");
var router_1 = require("./router");
var app = express_1["default"]();
app.use(express_1["default"].json());
app.use(router_1.router);
app.use(cors_1["default"]());
app.use(function (err, req, res, next) {
    if (err instanceof Error) {
        //se for uma instancia do tipo erro
        return res.status(400).json({
            error: err.message
        });
    }
    ;
    return res.status(500).json({
        status: "error",
        message: "internal server error"
    });
});
app.listen(3333, function () { return console.log("servidor online"); });
