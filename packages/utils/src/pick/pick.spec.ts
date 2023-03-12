import { pick } from '.'

describe('use pick', () => {
	interface TestObj {
		a: number
		b: boolean
		c: string
		d: number[]
		e: {
			x: string
			y: string
		}
	}
	const obj: TestObj = {
		a: 1,
		b: true,
		c: 'qwer',
		d: [1, 2, 3],
		e: {
			x: 'xxx',
			y: 'yyy'
		}
	}

	it('should get keys', () => {
		expect(Object.keys(pick(obj, 'a'))).toStrictEqual(['a'])
		expect(Object.keys(pick(obj, 'a', 'b'))).toStrictEqual(['a', 'b'])
		expect(Object.keys(pick(obj, 'a', 'b', 'c'))).toStrictEqual(['a', 'b', 'c'])
		expect(Object.keys(pick(obj, 'a', 'b', 'c', 'd'))).toStrictEqual(['a', 'b', 'c', 'd'])
		expect(Object.keys(pick(obj, 'a', 'b', 'c', 'd', 'e'))).toStrictEqual(['a', 'b', 'c', 'd', 'e'])
	})

	it('should get object', () => {
		expect(pick(obj, 'a')).toStrictEqual({
			a: 1
		})
		expect(pick(obj, 'a', 'b')).toStrictEqual({
			a: 1,
			b: true
		})
		expect(pick(obj, 'a', 'b', 'c')).toStrictEqual({
			a: 1,
			b: true,
			c: 'qwer'
		})
		expect(pick(obj, 'a', 'b', 'c', 'd')).toStrictEqual({
			a: 1,
			b: true,
			c: 'qwer',
			d: [1, 2, 3]
		})
		expect(pick(obj, 'a', 'b', 'c', 'd', 'e')).toStrictEqual({
			a: 1,
			b: true,
			c: 'qwer',
			d: [1, 2, 3],
			e: {
				x: 'xxx',
				y: 'yyy'
			}
		})
	})
})
