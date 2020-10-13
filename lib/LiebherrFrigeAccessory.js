"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LiebherrFridgeAccessory {
    constructor(platform, accessory, config, log, device, fridgeService) {
        this.platform = platform;
        this.accessory = accessory;
        this.config = config;
        this.log = log;
        this.device = device;
        this.fridgeService = fridgeService;
        this.enabledServices = [];
        this.platform = platform;
        this.log = platform.log;
        this.device = device;
        this.Service = this.platform.api.hap.Service;
        this.Characteristic = this.platform.api.hap.Characteristic;
        this.log.info("Init device ", device);
        this.accessory.getService(this.platform.Service.AccessoryInformation)
            .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Liebherr')
            .setCharacteristic(this.platform.Characteristic.FirmwareRevision, 'FIRMWARE')
            .setCharacteristic(this.platform.Characteristic.Model, "MODEL")
            .setCharacteristic(this.platform.Characteristic.SerialNumber, "SERIAL");
    }
}
exports.default = LiebherrFridgeAccessory;
