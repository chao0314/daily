const middleware = {}

middleware['token'] = require('..\\middleware\\token.js');
middleware['token'] = middleware['token'].default || middleware['token']

export default middleware
