import LiebherrFridge from './LiebherrFridge'

const axios = require('axios')

export default class LiebherrFridgeService {

	private accessToken: string
	private refreshToken: string

	private client: any

	private appID: string = 'hau-connapp'
	private appSecret: string = ''

	constructor() {
		this.client = axios.create()
	}

	async loginUser(email: string, password: string) {

		const url1 = 'https://login.liebherr.com/Account/Login'


		try {
			let res = await axios.post(url, loginObject)

			if (res.status == 200) {

			}

		}

	}

	async getHousehold() {
		let devices: LiebherrFridge[] = []

		const url = 'api.sdb20.home.myliebherr.com/api/Household/GetHouseholdByUpn';
		try {
			let res = await this.client.get(url)
			if (res.status == 200) {

			}
		}



		return devices
	}
	
	async getDeviceInformation(serial: string) {
		const url = 'https://api.sdb20.home.myliebherr.com/api/fridge/' + serial + '/state/3.0.0'
	}

	async updateDeviceValue() {
		const url = 'api.sdb20.home.myliebherr.com/api/commands' + SERIAL


	}

}