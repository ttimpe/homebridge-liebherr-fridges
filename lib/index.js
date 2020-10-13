"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const LiebherrFridgePlatform_1 = __importDefault(require("./LiebherrFridgePlatform"));
module.exports = (api) => {
    api.registerPlatform("homebridge-liebherr-fridges", "LiebherrFridges", LiebherrFridgePlatform_1.default);
};
