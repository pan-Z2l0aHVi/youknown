import { isArray, isEmptyArray, isAllArray, isEqualArray } from './array'
import { isBoolean, isAllBoolean } from './boolean'
import { isFunction, isAllFunction } from './function'
import { isNull, isAllNull } from './null'
import { isNumber, isAllNumber } from './number'
import { isObject, isAllObject, isEmptyObject, isPlainObject } from './object'
import { isString, isAllString } from './string'
import { isUndefined, isAllUndefined } from './undefined'

const object = isObject as typeof isObject & {
	empty: typeof isEmptyObject
	plain: typeof isPlainObject
}
object.empty = isEmptyObject
object.plain = isPlainObject

const array = isArray as typeof isArray & {
	empty: typeof isEmptyArray
	equal: typeof isEqualArray
}
array.empty = isEmptyArray
array.equal = isEqualArray

export default {
	undefined: isUndefined,
	null: isNull,
	string: isString,
	number: isNumber,
	boolean: isBoolean,
	function: isFunction,
	object,
	array,
	all: {
		undefined: isAllUndefined,
		null: isAllNull,
		object: isAllObject,
		array: isAllArray,
		function: isAllFunction,
		string: isAllString,
		number: isAllNumber,
		boolean: isAllBoolean
	}
}
