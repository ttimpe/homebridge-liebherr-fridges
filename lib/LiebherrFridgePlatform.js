"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LiebherrFrigeAccessory_1 = __importDefault(require("./LiebherrFrigeAccessory"));
const LiebherrFridgeService_1 = __importDefault(require("./LiebherrFridgeService"));
const PLUGIN_NAME = "homebridge-liebherr-fridges";
const PLATFORM_NAME = "LiebherrFridges";
let hap;
let Accessory;
class LiebherrFridgePlatform {
    constructor(log, config, api) {
        this.log = log;
        this.config = config;
        this.api = api;
        this.Service = this.api.hap.Service;
        this.Characteristic = this.api.hap.Characteristic;
        this.accessories = [];
        this.liebherrFridges = [];
        this.liebherrFridgeAccessories = [];
        this.log = log;
        this.config = config;
        this.api = api;
        api.on('didFinishLaunching', () => {
            this.didFinishLaunching();
        });
    }
    configureAccessory(accessory) {
        this.log.info('Loading accessory from cache:', accessory.displayName);
        // add the restored accessory to the accessories cache so we can track if it has already been registered
        this.accessories.push(accessory);
    }
    async didFinishLaunching() {
        this.log.info("LiebherrFridgePlatform initialized");
        this.liebherrFridgeService = new LiebherrFridgeService_1.default();
        if (this.config.email && this.config.password) {
            let email = this.config.email.toString();
            let password = this.config.password.toString();
            this.log.info("Logging in user");
            await this.liebherrFridgeService.loginUser(email, password);
            this.liebherrFridges = await this.liebherrFridgeService.getDevices();
            // Now make platform accessories out of those devices, check if they already exist, etc.
            for (var i = 0; i < this.liebherrFridges.length; i++) {
                const uuid = this.api.hap.uuid.generate('homebridge-liebherr-fridges-' + this.liebherrFridges[i].serial);
                this.log.info("Existing accessories", this.accessories);
                const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);
                this.log.info("existingAccessory value", existingAccessory);
                if (existingAccessory) {
                    this.log.info('Restoring accessory');
                    let liebherrFridgeAccessory = new LiebherrFrigeAccessory_1.default(this, existingAccessory, this.config, this.log, this.liebherrFridges[i], this.liebherrFridgeService);
                    this.liebherrFridgeAccessories.push(liebherrFridgeAccessory);
                    this.api.updatePlatformAccessories([existingAccessory]);
                }
                else {
                    this.log.info("Creating new accessory");
                    let accessory = new this.api.platformAccessory(this.liebherrFridges[i].name, uuid);
                    let liebherrAccessory = new LiebherrFrigeAccessory_1.default(this, accessory, this.config, this.log, this.liebherrFridges[i], this.liebherrFridgeService);
                    this.log.info('Created new accessory with name', this.liebherrFridges[i].name);
                    this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
                    this.liebherrFridgeAccessories.push(liebherrAccessory);
                }
            }
            setInterval(() => {
                this.updateValues();
            }, 10000);
        }
    }
    async updateValues() {
    }
}
exports.default = LiebherrFridgePlatform;
