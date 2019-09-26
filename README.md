Protect This House Your API
The purpose of this lab is to protect your Blog API routes by adding back end authentication! You should be able to "login" by sending a POST request to a route in Postman. This login should create and send tokens on a successful response. After, you need to be able to protect certain routes on your API by requiring a valid auth token.

Steps
MySQL
Make sure your users (or authors) table contains an email column, a password column of type VARCHAR(60), and a role column that can be any text data type. It'd be good practice to make the default value of role to "guest"
If you don't have one, create a accesstokens table with at least the following:
accesstokens (
    id,
    userid (FK to users id),
    token TEXT NOT NULL,
    _created
);
Create a new user with privileges to connect to this schema
Express Config
Create a config directory in your server src code
Have an index.ts that will swap between production/development based on the environment variable NODE_ENV
Export your MySQL config object from your development.ts and a mirror object format from production.ts using environment variables
Update your .gitignore to include just the development.ts file
Express DB Queries
Connect to your MySQL DB if you aren't already
Should already have CRUD (get all, get one, insert, update, and delete) operations for blogs table, write them if you don't
For your users table, make sure you can findOneByEmail and findOneById at minimum
For your accesstokens table, make sure you can findOneByIdAndToken, insert, and update a token at a minimum
Note: If you wish to write a more generic / reusable find, findOne, or any other query, go for it! You don't have to have these very specific queries that the walkthroughs demo. You can write similar functions that can take an entire object and use its keys/values to make a dynamic query every time!

Installs
Make sure you have the following modules and their types installed:

bcrypt @types/bcrypt
jsonwebtoken @types/jsonwebtoken
passport @types/passport
passport-http-bearer @types/passport-http-bearer
passport-local @types/passport-local
Utilities
Create a Password Utility using bcrypt to:
Generate a hashed and salted password
Compare a plain text password to a hash
Create a Token Utility using crypto and jwt to:
CreateToken
Create a new row in your accesstokens table with that users' id
Update your payload with that new row's id
Generate a unique property using crypto
Sign the token using jwt and a secret auth key
Update the row with the token value
Return the token
ValidateToken
Using jwt to decode the token and get a payload
Find the payload in your accesstokens table to verify it
Return the payload
Middleware
Write a middleware for passport to use a new LocalStrategy to:

serialize/deserialize a user
Use the LocalStrategy using an email/password
Find that user by their email
Compare that user's hashed password with what they provided
Return the user if it's valid
Write a middleware for passport to use a new BearerStrategy to:

Validate a provided token
Using the token's payload, find that user's id in your users table
Return the user if it's valid
Make sure in your root server server.ts to:

Initialize passport
Import both your middlewares
Auth Routes
Create an auth router with /login and /register routes
Have the /login route authenticate a POST request with an email/password. If valid, respond with an object containing the token, userid, and role of that user
Have the /register route insert a new user with their hashed/salted password, generate a token, and respond with the same object as the above step (token, userid, and role)
API Routes
Have your passport 'bearer' intercept every incoming API route request
It should add a user property to the req object if provided a valid Bearer token
In any case, it should forward the req object to the next step in your route logic
Write a new function middleware using RequestHandler to check your req object for a user property or a specific role on that property
Completion
If all is coded, your completed back end authentication lab should be able to use Postman to:

Register a new user, and have their hash stored in your users table
Use the token from a new user's registration to make a request to a protected route
Make sure you receive "unauthorized" on those protected routes when using no/an incorrect token