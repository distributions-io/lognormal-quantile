options( digits = 16 )
library( jsonlite )


mu = 0
sigma = 1
probs = c( 0, 0.25, 0.5, 0.75, 1 )
y = qlnorm( probs, mu, sigma )

cat( y, sep = ",\n" )

data = list(
	mu = mu,
	sigma = sigma,
	data = probs,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/number.json" )
