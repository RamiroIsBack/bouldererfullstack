const mongoose = require('mongoose');
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString,GraphQLID} =graphql;
const Area = mongoose.model('area');
const Problem = mongoose.model ('problem');
const User = mongoose.model('user');

const PhotoType = new GraphQLObjectType({
  name: 'Photo_type',
  fields: ()=> ({
    id: {type: GraphQLID},
    date: {type: GraphQLString},
    nombre:{type:GraphQLString},
    img:{type:GraphQLString},
    user: {
      type: require('./user_type'),
      resolve(parentValue, args){
        return User.findById(parentValue.userId)
      }
    },
    area: {
      type: require('./area_type'),
      resolve(parentValue) {
        return Area.findById(parentValue.areaId)
      }
    },
    problem:{
      type: require('./problem_type'),
      resolve(parentValue){
        return Problem.findById(parentValue.problemId)
       
      }
    }
  })
});
module.exports = PhotoType;