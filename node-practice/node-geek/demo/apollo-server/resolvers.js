const data = require('../mockdata/comment');
const resolvers = {
    Query: {
        comment: (parent, args, ctx) => {

            return data;

        }
    },

    Mutation: {

        praise: (parent, args, ctx) => {
            let {id} = args;
            let comment = data.find(item => item.id === Number(id));
            return ++comment.praiseNum;

        }
    }


}


exports = module.exports = resolvers;