import {
	API,
	CharacteristicEventTypes,
	CharacteristicGetCallback,
	CharacteristicSetCallback,
	CharacteristicValue,
	Characteristic,
	HAP,
	DynamicPlatformPlugin,
	Logging,
	PlatformAccessory,
	PlatformConfig,
	Service,
	Categories
} from "homebridge";

import LiebherrFridge from './LiebherrFridge';
import LiebherrFridgeService from './LiebherrFridgeService'
import LiebherrFridgePlatform from './LiebherrFridgePlatform'


export default class LiebherrFridgeAccessory {
	private Service: any
	private Characteristic: any

	private fridgeThermostatService: Service
	private freezerThermostatService: Service
	private biofreshPlusThermostatService: Service

	private superCoolSwitchService: Service
	private superFrostSwitchService: Service
	private holidaySensor: Service
	private bottleTimerSwitchService: Service
	private iceMakerSwitchService: Service
	private sabbathModeSwitchService: Service

	private enabledServices: Service[] = []

	constructor(private readonly platform: LiebherrFridgePlatform,
		private readonly accessory: PlatformAccessory,
		private readonly config: any,
		private readonly log: Logging,
		private device: LiebherrFridge,
		private fridgeService: LiebherrFridgeService
		) {
		this.platform = platform;
		this.log = platform.log;

		this.device = device

		this.Service = this.platform.api.hap.Service

		this.Characteristic = this.platform.api.hap.Characteristic

		this.log.info("Init device ", device)

		this.accessory.getService(this.platform.Service.AccessoryInformation)!
		.setCharacteristic(this.platform.Characteristic.Manufacturer, 'Liebherr')
		.setCharacteristic(this.platform.Characteristic.FirmwareRevision, 'FIRMWARE')
		.setCharacteristic(this.platform.Characteristic.Model, "MODEL")
		.setCharacteristic(this.platform.Characteristic.SerialNumber, "SERIAL")




	}
}