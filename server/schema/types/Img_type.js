
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString,GraphQLID} =graphql;

const ImgType = new GraphQLObjectType({
  name: 'Img_Type',
  fields: ()=> ({
    id:{type:GraphQLID},
    data:{type: GraphQLString},
    
  })
});
module.exports = ImgType;