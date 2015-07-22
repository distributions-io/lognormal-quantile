'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	partial = require( './partial.js' );


// QUANTILE //

/**
* FUNCTION: quantile( arr, mu, sigma, path[, sep] )
*	Evaluates the quantile function for a Lognormal distribution with location parameter `mu` and scale parameter `sigma` for each array element and sets the input array.
*
* @param {Array} arr - input array
* @param {Number} mu - location parameter
* @param {Number} sigma - scale parameter
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function quantile( x, mu, sigma, path, sep ) {
	var len = x.length,
		opts = {},
		dget,
		dset,
		fcn,
		v, i;
	if ( arguments.length > 4 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		fcn = partial( mu, sigma );
		for ( i = 0; i < len; i++ ) {
			v = dget( x[ i ] );
			if ( typeof v === 'number' ) {
				dset( x[i], fcn( v ) );
			} else {
				dset( x[i], NaN );
			}
		}
	}
	return x;
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;
