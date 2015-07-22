options( digits = 16 )
library( jsonlite )

mu = 6
sigma = 2
probs = 0:24 / 25
y = qlnorm( probs, mu, sigma )

cat( y, sep = ",\n" )

data = list(
	mu = mu,
	sigma = sigma,
	data = probs,
	expected = y
)


write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/matrix.json" )
