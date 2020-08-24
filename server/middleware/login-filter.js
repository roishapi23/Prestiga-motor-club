const expressJwt = require('express-jwt');
const config = require('../config.json');

// Extracting the text from the secret's JSON
let { secret } = config;

//console.log(secret);

function authenticateJwtRequestToken() {
    let array = []
    for (let index = 1; index < 100; index++) {
        array.push('/cars/'+index) 
    }
    
    // Load secret into 
    return expressJwt({ secret , algorithms: ['HS256'] }).unless({
        
        path: [
            // public routes that don't require authentication
            '/users/login',
            '/users/auth/:authorizationString',
            '/users/memberships',
            '/users/memberships/:name',
            '/users/message',
            '/cars/',
            '/Memberships/',
            // '/cars/3',
            ...array
            // `/cars/:${Number}`,

            
        ]
    });
}

module.exports = authenticateJwtRequestToken;