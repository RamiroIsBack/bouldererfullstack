const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList , GraphQLFloat} = graphql;
const ProblemType = require('./problem_type');
const UserType = require('./user_type');
const Area = mongoose.model('area');
const User = mongoose.model ('user');

const AreaType = new GraphQLObjectType({
  name:  'AreaType',
  fields: () => ({
    id: { type: GraphQLID },
    user:{
      type: UserType,
      resolve(parentValue,args){
        return User.findById(parentValue.user)
        
      }
    },
    description: { type: GraphQLString },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
    nombre: { type: GraphQLString },
    photos:{ type: new GraphQLList(GraphQLString)},
    comments:{ type: new GraphQLList(GraphQLString)},
    problems: {
      type: new GraphQLList(ProblemType),
      resolve(parentValue) {
        
        return Area.findProblems(parentValue.id);
      }
    }
  })
});

module.exports = AreaType;