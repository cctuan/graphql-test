
import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLNonNull
} from 'graphql'

let _count = 1

const CountType = new GraphQLObjectType({
  name : 'Count',
  description : 'count',
  fields : {
    count : {
      type : GraphQLInt,
      resolve : () => {
        return _count
      }
    }
  }
})

const schema = new GraphQLSchema({
  query : CountType,
  mutation : new GraphQLObjectType({
    name: 'AddCount',
    fields : {
      addCount : {
        type : CountType,
        description : 'Add Count',
        args : {
          count : {
            type : new GraphQLNonNull(GraphQLInt),
            description : `new Count`
          }
        },
        resolve : (root, { count }) => {
          _count = count
          return _count
        }
      }
    }
  })
})

export default schema
