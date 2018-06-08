const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat
} = graphql;
const Problem = mongoose.model('problem');
const User = mongoose.model ('user');

// const PhotoType = new GraphQLObjectType({
//   name:'phototype',
//   fields:() =>({
//     urlFoto: {type:GraphQLString},
//     nombreFoto:{type:GraphQLString},
//     userId:{type:GraphQLString},
//   })
// })

const ProblemType = new GraphQLObjectType({
  name:  'problemType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    description: { type: GraphQLString },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
    nombre: { type: GraphQLString },
    photos:{ type: new GraphQLList(GraphQLString)},
    comments:{ type: new GraphQLList(GraphQLString)},
    user: {
      type: require('./user_type'),
      resolve(parentValue, args){
        return User.findById(parentValue.userId)
      }
    },
    area: {
      type: require('./area_type'),
      resolve(parentValue) {
        return Problem.findById(parentValue).populate('area')
          .then(problem => {
            console.log(problem)
            return problem.area
          });
      }
    }
  })
});

module.exports = ProblemType;