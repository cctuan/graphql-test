
import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList
} from 'graphql'

let _count = 1
let _members = [
  { name : 'George' },
  { name : 'Xina' }
]

const MemberType = new GraphQLObjectType({
  name : 'MemberType',
  description : 'member',
  fields : () => ({
    name : {
      type : GraphQLString
    }
  })
})

const CountType = new GraphQLObjectType({
  name : 'Count',
  description : 'count',
  fields : {
    count : {
      type : GraphQLInt,
      resolve : (t) => {
        return t.length
      }
    },
    members : {
      type : new GraphQLList(GraphQLString),
      resolve : (t) => {
        return t.map(mem => mem.name)
      }
    }
  }
})

const schema = new GraphQLSchema({
  query : CountType,
  mutation : new GraphQLObjectType({
    name: 'MemberMutation',
    fields : {
      addMember : {
        type : CountType,
        description : 'Add member',
        args : {
          name : {
            type : new GraphQLNonNull(GraphQLString),
            description : `new name`
          }
        },
        resolve : (root , {name}) => {
          const newMember = { name : name }
          _members.push(newMember)
          return _members
        }
      },
      updateMember : {
        type : CountType,
        description : 'update member',
        args : {
          new_name : {
            type : new GraphQLNonNull(GraphQLString),
            description : `update new name`
          },
          old_name : {
            type : new GraphQLNonNull(GraphQLString),
            description : `update old name`
          }
        },
        resolve : (root , { new_name, old_name }) => {
          _members = _members.map(mem => {
            if (mem.name === old_name) {
              return {
                name : new_name
              }
            }
            return mem
          })
          return _members
        }
      },
      removeMember : {
        type : CountType,
        description : 'remove member',
        args : {
          name : {
            type : new GraphQLNonNull(GraphQLString),
            description : `remove name`
          }
        },
        resolve : (root , {name}) => {
          _members = _members.filter(mem => {
            return mem.name !== name
          })
          return _members
        }
      },
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
