const graphql = require('graphql');
const mongoose = require('mongoose');

const {GraphQLObjectType, GraphQLString,GraphQLID,GraphQLList} =graphql;
const Area = mongoose.model('area');
const Problem = mongoose.model ('problem');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: ()=> ({
    id: {type: GraphQLID},
    email: {type: GraphQLString},
    nombre:{type:GraphQLString},
    areas:{
      type: new GraphQLList(require('./area_type')),
      resolve(parentValue){
        return Area.find({user: parentValue.id})
        .then(areas => {
          return areas;
        })
      }
    },
    problems:{
      type: new GraphQLList(require('./problem_type')),
      resolve(parentValue){
        return Problem.find({user: parentValue.id})
        .then(problems => {
          return problems;
        })
      }
    }
  })
});
module.exports = UserType;