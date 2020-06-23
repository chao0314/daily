const fs = require('fs');
const path = require('path');
const {ApolloServer, gql} = require('apollo-server-koa');
const typeDefs = gql`${fs.readFileSync(path.resolve(__dirname,'./schemas.graphql'))}`;
const resolvers = require('./resolvers');
const server = new ApolloServer({typeDefs, resolvers});
// const Koa = require('koa');
// const koaStatic = require('koa-static');
// let app = new Koa();
//
// app.use(koaStatic(path.resolve(__dirname, '../public')));
// app.use(server.getMiddleware({path:'/api'}));
// app.listen(8088, () => console.log('gpl server 8088'));


exports = module.exports = server;
