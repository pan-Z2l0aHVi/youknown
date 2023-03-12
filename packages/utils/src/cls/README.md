```js
// Strings (variadic)
cls('foo', true && 'bar', 'baz')
//=> 'foo bar baz'

// Objects
const isTrue = () => true
cls({ foo: true, bar: false, baz: isTrue() })
//=> 'foo baz'

// Objects (variadic)
cls({ foo: true }, { bar: false }, null, { '--foobar': 'hello' })
//=> 'foo --foobar'

// Arrays
cls(['foo', 0, false, 'bar'])
//=> 'foo bar'

// Arrays (variadic)
cls(['foo'], ['', 0, false, 'bar'], [['baz', [['hello'], 'there']]])
//=> 'foo bar baz hello there'

// Kitchen sink (with nesting)
cls('foo', [1 && 'bar', { baz: false, bat: null }, ['hello', ['world']]], 'cya')
//=> 'foo bar hello world cya'
```