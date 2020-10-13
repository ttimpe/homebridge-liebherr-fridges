import LiebherrFridge from './LiebherrFridge'

export default class LiebherrFridgeService {

	private accessToken: string
	private refreshToken: string

	async loginUser(email: string, password: string) {

		const url = ''

	}

	async getDevices() {
		let devices: LiebherrFridge[] = []

		const url = ''

		return devices
	}
	
	async updateDeviceValue() {
		const url = ''
	}

}