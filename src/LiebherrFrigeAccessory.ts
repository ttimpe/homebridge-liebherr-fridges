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

	//private superCoolSwitchService: Service
	//private superFrostSwitchService: Service
	//private holidaySensor: Service
	//private bottleTimerSwitchService: Service
	//private iceMakerSwitchService: Service
	//private sabbathModeSwitchService: Service

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


		this.fridgeThermostatService = this.accessory.getService('FridgeThermostat') || this.accessory.addService(this.platform.Service.HeaterCooler, 'FridgeThermostat', 'FridgeThermostat')
		this.freezerThermostatService = this.accessory.getService('FreezerThermostat') || this.accessory.addService(this.platform.Service.HeaterCooler, 'FreezerThermostat', 'FreezerThermostat')


		this.fridgeThermostatService.getCharacteristic(this.Characteristic.CurrentTemperature)
		.on('get', this.handleCurrentTemperatureForFridgeGet.bind(this))


		this.fridgeThermostatService.getCharacteristic(this.Characteristic.TargetTemperature)
		.on('get', this.handleTargetTemperatureForFridgeGet.bind(this))
		.on('set', this.handleTargetTemperatureForFridgeSet.bind(this))
		.setProps({

			minValue: 3,
			maxValue: 9
		});


		this.freezerThermostatService.getCharacteristic(this.Characteristic.CurrentTemperature)
		.on('get', this.handleCurrentTemperatureForFreezerGet.bind(this))


		this.fridgeThermostatService.getCharacteristic(this.Characteristic.TargetTemperature)
		.on('get', this.handleTargetTemperatureForFreezerGet.bind(this))
		.on('set', this.handleTargetTemperatureForFreezerSet.bind(this))
		.setProps({
			minValue: -26,
			maxValue: -16
		});




	}

	/* Fridges should always be cooling */

	handleCurrentHeatingCoolingStateGet(callback: CharacteristicGetCallback) {
		this.log.debug('Triggered GET CurrentHeaterCoolerState');

		callback(null, this.platform.Characteristic.CurrentHeaterCoolerState.COOLING)
	}



	handleTargetHeaterCoolerStateGet(callback: CharacteristicGetCallback) {
		this.log.debug('Triggered GET TargetHeaterCoolerState');

		// set this to a valid value for TargetHeaterCoolerState

		callback(null, this.platform.Characteristic.TargetHeaterCoolerState.COOL);
	}

	handleTargetHeaterCoolerStateSet(value: any, callback: CharacteristicSetCallback) {
		this.log.debug('Triggered SET TargetHeaterCooerState:',value);

		callback(null);
	}

	/* So far, this be celsius only */

	handleTemperatureDisplayUnitsGet(callback: CharacteristicGetCallback) {
		this.log.debug('Triggered GET TemperatureDisplayUnits');

		// set this to a valid value for TemperatureDisplayUnits
		const currentValue = 0;

		callback(null, currentValue);
	}

	handleTemperatureDisplayUnitsSet(value: any, callback: CharacteristicSetCallback) {
		this.log.debug('Triggered SET TemperatureDisplayUnits:',value);

		callback(null);
	}


	// Fridge callbacks

	handleCurrentTemperatureForFridgeGet(callback: CharacteristicGetCallback) {
		this.log.debug('Triggered GET handleCurrentTemperatureForFridgeGet');

		// set this to a valid value for CurrentTemperature
		const currentValue = 1;
		callback(null, currentValue)

	}


  /**
   * Handle requests to get the current value of the "Target Temperature" characteristic
   */
   handleTargetTemperatureForFridgeGet(callback: CharacteristicGetCallback) {
   	this.log.debug('Triggered GET TargetTemperature');

   	// set this to a valid value for TargetTemperature
   	const currentValue = 1;

   	callback(null, 1);
   }

  /**
   * Handle requests to set the "Target Temperature" characteristic
   */
   handleTargetTemperatureForFridgeSet(value: any, callback: CharacteristicSetCallback) {
   	this.log.debug('Triggered SET TargetTemperatureForFridge:',value);

   	callback(null);
   }

   // Freezer callbacks

   handleCurrentTemperatureForFreezerGet(callback: CharacteristicGetCallback) {
   	this.log.debug('Triggered GET handleCurrentTemperatureForFreezerGet');

   	// set this to a valid value for CurrentTemperature
   	const currentValue = 1;
   	callback(null, currentValue)

   }


  /**
   * Handle requests to get the current value of the "Target Temperature" characteristic
   */
   handleTargetTemperatureForFreezerGet(callback: CharacteristicGetCallback) {
   	this.log.debug('Triggered GET TargetTemperatureForFreezer');

   	// set this to a valid value for TargetTemperature
   	const currentValue = 1;

   	callback(null, 1);
   }

  /**
   * Handle requests to set the "Target Temperature" characteristic
   */
   handleTargetTemperatureForFreezerSet(value: any, callback: CharacteristicSetCallback) {
   	this.log.debug('Triggered SET TargetTemperatureForFreezer:',value);

   	callback(null);
   }


}