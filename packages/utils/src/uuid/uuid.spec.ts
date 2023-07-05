import uuid from '.'

describe('uuid', () => {
	it('should return a string of length 36', () => {
		const result = uuid()
		expect(result).toHaveLength(36)
	})

	it('should return a valid UUID format', () => {
		const result = uuid()
		const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
		expect(uuidRegex.test(result)).toBe(true)
	})
})
