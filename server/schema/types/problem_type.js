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
const PhotoType = require('./photo_type');
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
    comments:{ type: new GraphQLList(GraphQLString)},
    photos:{ 
      type: new GraphQLList(PhotoType),
      resolve(parentValue,args){
        return Problem.findPhotos(parentValue.id);
        
      }
    },
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