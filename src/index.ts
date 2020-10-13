import { API } from 'homebridge'
import LiebherrFridgePlatform from './LiebherrFridgePlatform'

export = (api: API) => {
  api.registerPlatform("homebridge-liebherr-fridges","LiebherrFridges", LiebherrFridgePlatform);
}
