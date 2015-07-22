'use strict';

// FUNCTIONS //


// PARTIAL //

/**
* FUNCTION: partial( mu, sigma )
*	Partially applies location parameter `mu` and scale parameter `sigma` and returns a function for evaluating the quantile function for a Lognormal distribution.
*
* @param {Number} mu - location parameter
* @param {Number} sigma - scale parameter
* @returns {Function} quantile function
*/
function partial( mu, sigma ) {

	/**
	* FUNCTION: quantile( p )
	*	Evaluates the quantile function for a Lognormal distribution.
	*
	* @private
	* @param {Number} p - input value
	* @returns {Number} evaluated quantile function
	*/
	return function quantile( p ) {
		if ( p !== p || p < 0 || p > 1 ) {
			return NaN;
		}
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
