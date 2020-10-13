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
  Categories,
  Service
} from "homebridge"


import LiebherrFridgeAccessory from './LiebherrFrigeAccessory'
import LiebherrFridgeService from './LiebherrFridgeService'
import LiebherrFridge from './LiebherrFridge'

const PLUGIN_NAME = "homebridge-liebherr-fridges"
const PLATFORM_NAME = "LiebherrFridges"

let hap: HAP
let Accessory: typeof PlatformAccessory


export default class LiebherrFridgePlatform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;

  public liebherrFridgeService: LiebherrFridgeService

  public readonly accessories: PlatformAccessory[] = []
  public liebherrFridges: LiebherrFridge[] = []

  constructor(
    public readonly log: Logging,
    public readonly config: PlatformConfig,
    public readonly api : API) {
    this.log = log
    this.config = config
    this.api = api

    api.on('didFinishLaunching', () => {
      this.didFinishLaunching();
    })

  }

  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Loading accessory from cache:', accessory.displayName);
    // add the restored accessory to the accessories cache so we can track if it has already been registered
    this.accessories.push(accessory);
  }


  async didFinishLaunching() {
    this.log.info("APCHome initialized")
    this.liebherrFridgeService = new LiebherrFridgeService()
    if (this.config.email && this.config.password) {
      let email = this.config.email.toString()
      let password = this.config.password.toString()
      this.log.info("Logging in user")
      await this.liebherrFridgeService.loginUser(email, password)
      this.liebherrFridges = await this.liebherrFridgeService.getDevices()
      // Now make platform accessories out of those devices, check if they already exist, etc.

      for (var i=0; i<this.liebherrFridges.length; i++) {
        const uuid = this.api.hap.uuid.generate('homebridge-liebherr-fridges-' + this.liebherrFridges[i].serial)
        this.log.info("Existing accessories", this.accessories)
        const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid)
        this.log.info("existingAccessory value", existingAccessory)
        if (existingAccessory) {
          this.log.info('Restoring accessory')
          let liebherrFridge = new LiebherrFridgeAccessory(this, existingAccessory, this.config, this.log, this.liebherrFridges[i], this.liebherrFridgeService)
          this.liebherrFridges.push(liebherrFridge)

          this.api.updatePlatformAccessories([existingAccessory])

        } else {
          this.log.info("Creating new accessory")

          let accessory = new this.api.platformAccessory(this.liebherrFridges[i].name, uuid)
          let liebherrAccessory = new LiebherrFridgeAccessory(this, accessory, this.config, this.log, this.liebherrFridges[i], this.liebherrFridgeService)
          this.log.info('Created new accessory with name', this.liebherrFridges[i].name)
          this.api.registerPlatformAccessories(PLUGIN_NAME,PLATFORM_NAME,[accessory])
          this.liebherrFridges.push(liebherrAccessory)
        }

      }
      setInterval(() => {
        this.updateValues()
      }, 10000)
    }

  }


  async updateValues() {
    
  }
}