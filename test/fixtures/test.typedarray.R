options( digits = 16 )
library( jsonlite )


mu = 20
sigma = 30
probs = seq( 0, 1, 0.01 )
y = qlnorm( probs, mu, sigma )

cat( y, sep = ",\n" )

data = list(
	mu = mu,
	sigma = sigma,
	data = probs,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/typedarray.json" )
