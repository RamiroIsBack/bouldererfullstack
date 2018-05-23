const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require ('graphql');

//Hardcoded data
// const boulderers = [
//   {id:'1', name:'Jhon Doe', email:'jhon@gmail.com', age: 35},
//   {id:'2', name:'Steve Smith', email:'steve@gmail.com', age: 25},
//   {id:'3', name:'Sara Williams', email:'Sara@gmail.com', age: 35},
// ];

const AreaType = new GraphQLObjectType({
  name: 'Area',
  fields:() =>({
    id:{type:GraphQLString},
    name:{type:GraphQLString},
    style:{type:GraphQLString},
    location:{type:GraphQLString},
    boulderers:{
      type: new GraphQLList(BouldererType),
      resolve(parentValue,args){
        //console.log(parentValue)
        return axios.get(`http://localhost:3000/areas/${parentValue.id}/boulderers`)
        .then(res=>res.data)
      }
    }
  })
});
//BouldererType
const BouldererType = new GraphQLObjectType({
  name:'Boulderer',
  fields:() =>({
    id:{type: GraphQLString},
    name:{type:GraphQLString},
    email:{type:GraphQLString},
    age:{type:GraphQLInt},
    area:{
      type:AreaType,
      resolve(parentValue,args){
        //console.log(parentValue)
        return axios.get(`http://localhost:3000/areas/${parentValue.areaId}`)
          .then(res=>res.data)
      }
    }
  })
});
// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    boulderer:{
      type:BouldererType,
      args: {
        id:{type:GraphQLString}
      },
      resolve(parentValue, args){
        // for(let i =0 ; i<boulderers.length ; i++){
        //   if(boulderers[i].id ===args.id){
        //     return boulderers[i]
        //   }
        // }
        return axios.get(`http://localhost:3000/boulderers/${args.id}`)
          .then(res => res.data);
      }
    },
    boulderers:{
      type: new GraphQLList(BouldererType),
      resolve(parentValue,args){
        return axios.get('http://localhost:3000/boulderers')
          .then(res => res.data);

      }
    },
    areas:{
      type: new GraphQLList(AreaType),
      resolve(parentValue,args){
        return axios.get('http://localhost:3000/areas')
          .then(res => res.data);

      }
    },
    area:{
      type: AreaType,
      args:{id:{type:GraphQLString}},
      resolve(parentValue,args){
        return axios.get(`http://localhost:3000/areas/${args.id}`)
          .then(resp=>resp.data);
      }
    }

  }
});

//mutations
const mutation = new GraphQLObjectType({
  name:'Mutation',
  fields:{
    addBoulderer:{
      type: BouldererType,
      args:{
        name:{type: new GraphQLNonNull (GraphQLString)},
        email:{type: new GraphQLNonNull (GraphQLString)},
        age:{type: new GraphQLNonNull (GraphQLInt)},
        areaId:{type:GraphQLString},
      },
      resolve(parentValue,args){
        return axios.post('http://localhost:3000/boulderers', {
          name:args.name,
          email:args.email,
          age:args.age,
        })
        .then(res =>res.data);
      }
    },
    deleteBoulderer:{
      type: BouldererType,
      args:{
        id:{type: new GraphQLNonNull (GraphQLString)},
      },
      resolve(parentValue,{id}){
        return axios.delete('http://localhost:3000/boulderers/'+id)
          .then(res =>res.data);

      }
    },
    editBoulderer:{
      type: BouldererType,
      args:{
        id:{type: new GraphQLNonNull (GraphQLString)},
        name:{type: GraphQLString},
        email:{type: GraphQLString},
        age:{type: GraphQLInt},

      },
      resolve(parentValue,args){
        return axios.patch('http://localhost:3000/boulderers/'+args.id,args)
        .then(res =>res.data);
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
