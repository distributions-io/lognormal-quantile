Quantile Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Lognormal](https://en.wikipedia.org/wiki/Lognormal_distribution) distribution [quantile function](https://en.wikipedia.org/wiki/Quantile_function).

The [quantile function](https://en.wikipedia.org/wiki/Quantile_function) for a [lognormal](https://en.wikipedia.org/wiki/Lognormal_distribution) random variable is

<div class="equation" align="center" data-raw-text="Q(p;\mu,\sigma)=\exp\left( \mu + \sigma \Phi^{-1}(p) \right )" data-equation="eq:quantile_function">
	<img src="https://cdn.rawgit.com/distributions-io/lognormal-quantile/a8cd405d2d6841e4372d5ab11eaa6fae618a4f47/docs/img/eqn.svg" alt="Quantile function for a lognormal distribution.">
	<br>
</div>

for `0 <= p < 1`, where `mu` is the location parameter and `sigma > 0` is the scale parameter.

## Installation

``` bash
$ npm install distributions-lognormal-quantile
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var quantile = require( 'distributions-lognormal-quantile' );
```

#### quantile( p[, options] )

Evaluates the [quantile function](https://en.wikipedia.org/wiki/Quantile_function) for the [lognormal](https://en.wikipedia.org/wiki/Lognormal_distribution) distribution. `p` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) between `0` and `1`, an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	mat,
	out,
	x,
	i;

out = quantile( 0.25 );
// returns ~0.509

x = [ 0, 0.2, 0.4, 0.6, 0.8, 1 ];
out = quantile( x );
// returns [ 0, ~0.431, ~0.776, ~1.29, ~2.32, +Infinity ]

x = new Float32Array( x );
out = quantile( x );
// returns Float64Array( [0,~0.431,~0.776,~1.29,~2.32,+Infinity] )

x = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i / 6;
}
mat = matrix( x, [3,2], 'float32' );
/*
	[   0  1/6
	  2/6  3/6
	  4/5  5/6 ]
*/

out = quantile( mat );
/*
	[  0    ~0.38
	  ~0.65 ~1
	  ~1.54 ~2.63 ]
*/
```

The function accepts the following `options`:

*	__mu__: location parameter. Default: `0`.
*	__sigma__: scale parameter. Default: `1`.
* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

A [Lognormal](https://en.wikipedia.org/wiki/Lognormal_distribution) distribution is a function of two parameter(s): `mu`(location parameter) and `sigma > 0`(scale parameter). By default, `mu` is equal to `0` and `sigma` is equal to `1`. To adjust either parameter, set the corresponding option.

``` javascript
var x = [ 0, 0.2, 0.4, 0.6, 0.8, 1 ];

var out = quantile( x, {
	'mu': 8,
	'sigma': 8
});
// returns [0,~1.3,~95,~2981,~93510,~6847352]
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	[0,0],
	[1,0.2],
	[2,0.4],
	[3,0.6],
	[4,0.8],
	[5,1]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = quantile( data, {
	'accessor': getValue
});
// returns [ 0, ~0.431, ~0.776, ~1.29, ~2.32, +Infinity ]
```


To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,0]},
	{'x':[1,0.2]},
	{'x':[2,0.4]},
	{'x':[3,0.6]},
	{'x':[4,0.8]},
	{'x':[5,1]}
];

var out = quantile( data, {
	'path': 'x/1',
	'sep': '/'
});
/*
	[
		{'x':[0,0]},
		{'x':[1,~0.431]},
		{'x':[2,~0.776]},
		{'x':[3,~1.29]},
		{'x':[4,~2.32]},
		{'x':[5,+Infinity]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var x, out;

x = new Float32Array( [0.2,0.4,0.6,0.8] );

out = quantile( x, {
	'dtype': 'int32'
});
// returns Int32Array( [0,0,1,2] )

// Works for plain arrays, as well...
out = quantile( [0.2,0.4,0.6,0.8], {
	'dtype': 'uint8'
});
// returns Uint8Array( [0,0,1,2] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var bool,
	mat,
	out,
	x,
	i;

x = [ 0, 0.2, 0.4, 0.6, 0.8, 1 ];

out = quantile( x, {
	'copy': false
});
// returns [ 0, ~0.431, ~0.776, ~1.29, ~2.32, +Infinity ]

bool = ( x === out );
// returns true

x = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i / 6 ;
}
mat = matrix( x, [3,2], 'float32' );
/*
	[   0  1/6
	  2/6  3/6
	  4/5  5/6 ]
*/

out = quantile( mat, {
	'copy': false
});
/*
	[  0    ~0.38
	  ~0.65 ~1
	  ~1.54 ~2.63 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	For any `p` outside the interval `[0,1]`, the the evaluated [quantile function](https://en.wikipedia.org/wiki/Quantile_function) is `NaN`.

	```javascript
	var out;

	out = quantile( 1.1 );
	// returns NaN

	out = quantile( -0.1 );
	// returns NaN
	```

*	If an element is __not__ a numeric value, the evaluated [quantile function](https://en.wikipedia.org/wiki/Quantile_function) is `NaN`.

	``` javascript
	var data, out;

	out = quantile( null );
	// returns NaN

	out = quantile( true );
	// returns NaN

	out = quantile( {'a':'b'} );
	// returns NaN

	out = quantile( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = quantile( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = quantile( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = quantile( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var quantile = require( 'distributions-lognormal-quantile' ),
	matrix = require( 'dstructs-matrix' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i / 10;
}
out = quantile( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = quantile( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = quantile( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Float32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i / 10;
}
out = quantile( data );

// Matrices...
mat = matrix( data, [5,2], 'float32' );
out = quantile( mat );

// Matrices (custom output data type)...
out = quantile( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-lognormal-quantile.svg
[npm-url]: https://npmjs.org/package/distributions-lognormal-quantile

[travis-image]: http://img.shields.io/travis/distributions-io/lognormal-quantile/master.svg
[travis-url]: https://travis-ci.org/distributions-io/lognormal-quantile

[codecov-image]: https://img.shields.io/codecov/c/github/distributions-io/lognormal-quantile/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/lognormal-quantile?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/lognormal-quantile.svg
[dependencies-url]: https://david-dm.org/distributions-io/lognormal-quantile

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/lognormal-quantile.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/lognormal-quantile

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/lognormal-quantile.svg
[github-issues-url]: https://github.com/distributions-io/lognormal-quantile/issues
