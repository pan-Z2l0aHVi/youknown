import uuid from '../uuid'

type Resolve = (value: any) => void
type Reject = (reason: any) => void
interface Params {
	[key: string]: any
}
interface TrackerOptions<S, R> {
	url: string
	transfer: (params: S) => R
	batchingDelay: number
}

const DEFAULT_OPTIONS = {
	transfer: (s: unknown) => s,
	batchingDelay: 200
}

export default class Tracker<S extends Params, R extends Params> {
	options: TrackerOptions<S, R>
	trackMap: Record<string, R>
	resolves: Resolve[]
	rejects: Reject[]
	idQueue: string[]
	constructor(opts: Partial<TrackerOptions<S, R>>) {
		this.options = {
			...DEFAULT_OPTIONS,
			...opts
		} as TrackerOptions<S, R>
		this.trackMap = {}
		this.resolves = []
		this.rejects = []
		this.idQueue = []
	}

	public track(params: S, instant = false) {
		const { transfer } = this.options
		const realParams = transfer(params)
		const trackID = uuid()
		if (instant) {
			const trackParams = this.makeTrackParams(trackID, realParams)
			this.request([trackParams])
		} else {
			this.batchingTrack(trackID, realParams)
		}
	}

	private batchingTrack(trackID: string, params: R) {
		const { batchingDelay } = this.options
		return new Promise((resolve, reject) => {
			this.resolves.push(resolve)
			this.rejects.push(reject)
			this.trackMap[trackID] = this.makeTrackParams(trackID, params)

			if (this.idQueue.push(trackID) === 1) {
				setTimeout(() => {
					this.request(this.idQueue.map(id => this.trackMap[id]))
					this.idQueue = []
				}, batchingDelay)
			}
		})
	}

	private makeTrackParams(id: string, params: R) {
		return {
			id,
			timestamp: new Date().getTime(),
			...params
		}
	}

	private request(paramsList: R[]) {
		const { url } = this.options
		try {
			navigator.sendBeacon(url, JSON.stringify(paramsList))
		} catch (error) {
			console.error('sendBeacon error: ', error)
		}
	}
}
