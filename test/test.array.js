/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Check whether an element is a finite number
	isFiniteNumber = require( 'validate.io-finite' ),

	// Module to be tested:
	quantile = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array quantile', function tests() {

	var validationData = require( './fixtures/array.json' ),
		mu = validationData.mu,
		sigma = validationData.sigma;

	it( 'should export a function', function test() {
		expect( quantile ).to.be.a( 'function' );
	});

	it( 'should evaluate the quantile function of the Lognormal distribution', function test() {
		var data, actual, expected, i;

		data = validationData.data;

		actual = new Array( data.length );

		actual = quantile( actual, data, mu, sigma );

		expected = validationData.expected.map( function( d ) {
			if (d === 'Inf' ) {
				return Number.POSITIVE_INFINITY;
			}
			if ( d === '-Inf' ) {
				return Number.NEGATIVE_INFINITY;
			}
			return d;
		});

		for ( i = 0; i < actual.length; i++ ) {
			if ( isFiniteNumber( actual[ i ] ) && isFiniteNumber( expected[ i ] ) ) {
				assert.closeTo( actual[ i ], expected[ i ], 1e-12 );
			}
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( quantile( [], [], mu, sigma ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = quantile( actual, data, mu, sigma );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );
	});

});
