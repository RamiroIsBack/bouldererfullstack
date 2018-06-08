const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const UserType = require ('./user_type');
const AreaType = require('../types/area_type');
const ProblemType = require('../types/problem_type')

const Problem = mongoose.model('problem');
const Area = mongoose.model('area');
const User = mongoose.model('user');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    currentUser:{
      type: UserType,
      resolve (parentValue,args,req){
        return req.user;
      }
    },
    user:{
      type: UserType,
      args:{id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, {id}){
        return User.findById(id);
      }
    },
    users:{
      type:new GraphQLList(UserType), //what it returns
      resolve(parentValue){
        return User.find({});
      }
    },
    area:{
      type: AreaType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Area.findById(id);
      }
    },
    areas:{
      type:new GraphQLList(AreaType), //what it returns
      resolve(parentValue){
        return Area.find({});
      }
    },
    problem:{
      type: ProblemType,
      args: {id:{type: new GraphQLNonNull(GraphQLID)}},
      resolve(parentValue,{id}){
        return Problem.findById(id);
      }
    },
    problems:{
      type:new GraphQLList(ProblemType), //what it returns
      resolve(parentValue){
        return Problem.find({});
      }
    },
  }
});

module.exports = RootQueryType;
