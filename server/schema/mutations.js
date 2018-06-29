const graphql = require('graphql');
const {assertOutputType,GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList ,GraphQLFloat} =graphql;
const UserType = require ('./types/user_type');
const AreaType = require ('./types/area_type');
const ProblemType = require ('./types/problem_type');
const PhotoType = require ('./types/photo_type');
const ImgType = require ('./types/Img_type');
const AuthService = require('../services/auth');

const mongoose = require('mongoose');
const User = mongoose.model('user');
const Area = mongoose.model('area');
const Problem = mongoose.model('problem');
const Photo = mongoose.model('photo');
const Img = mongoose.model('img');

const mutation = new GraphQLObjectType ({
  name: 'Mutation',
  fields:{
    signup: {
      type: UserType,
      args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        nombre: {type: GraphQLString}
      },
      resolve (parentValue,{email,password,nombre},req){
        return AuthService.signup({email,password,nombre, req});

      }
    },
    login: {
      type: UserType,
      args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
      },
      resolve (parentValue,{email,password},req){
        return AuthService.login({email,password, req});

      }
    },
    logout:{
      type:UserType,
      resolve(parentValue,args,req){
        const{user} = req;
        req.logout();
        return user;
      }
    },
    addArea: {
      type: AreaType,
      args: {
        userId: { type: GraphQLID },
        description: { type: GraphQLString },
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
        nombre: { type: GraphQLString },
        img: { type: GraphQLString },
        comments:{ type: new GraphQLList(GraphQLString)},
      },
      resolve(parentValue, { userId, nombre,img,description, comments, latitude, longitude }) {
       
        return Area.addArea(userId, nombre,img,description , comments, latitude, longitude )
       
      }
    },
    addProblemToArea: {
      type: AreaType,
      args: {
        description: { type: GraphQLString },
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
        nombre: { type: GraphQLString },
        img:{ type:GraphQLString},
        line:{ type:GraphQLString},
        comments:{ type: new GraphQLList(GraphQLString)},
        areaId: { type: GraphQLID },
        userId: { type: GraphQLID },
      },
      resolve(parentValue, { nombre,img,line, description, areaId, userId, comments, latitude, longitude }) {
        return Area.addProblem(nombre,img,line,description , areaId ,  userId, comments, latitude, longitude);
      }
    },
    likeProblem: {
      type: ProblemType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Problem.like(id);
      }
    },
    deleteArea: {
      type: AreaType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Area.remove({ _id: id });
      }
    },
    addImg:{
      type:ImgType,
      args: {
        data:{type: GraphQLString},
      },
      resolve(parentValue, {data}){
        return new Img({data}).save();
      }
    }
  }

});
module.exports = mutation;