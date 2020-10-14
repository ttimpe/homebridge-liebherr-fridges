export default class LiebherrFridge {
	public name: string
	public serial: string
	public modelName: string
	public deviceId: string

	public sabbathMode: boolean

	public coolerTargetTemperature: number = 5
	public freezerTargetTemperature: number = -20

	public biofreshPlusTemperature: number = 2

	public icemakerMode: boolean
	public bottleTimer: boolean
}