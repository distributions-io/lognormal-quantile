'use strict';

// FUNCTIONS //


// QUANTILE //

/**
* FUNCTION: quantile( p, mu, sigma )
*	Evaluates the quantile function for a Lognormal distribution with location parameter `mu` and scale parameter `sigma` at a probability `p`.
*
* @param {Number} p - input value
* @param {Number} mu - location parameter
* @param {Number} sigma - scale parameter
* @returns {Number} evaluated quantile function
*/
function quantile( p, mu, sigma ) {
	if ( p !== p || p < 0 || p > 1 ) {
		return NaN;
	}
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;
