
## Test curl command

```shell
curl -XPOST -H  "Content-Type:application/graphql" -d 'mutation { updateMember(new_name:"ggg" old_name: "test") {members, count} }' http://localhost:3000/graphql
```

```shell
curl -XPOST -H  "Content-Type:application/graphql" -d 'mutation { addMember(name: "test") {members, count} }' http://localhost:3000/graphql
```

```shell
curl -XPOST -H  "Content-Type:application/graphql" -d 'mutation { removeMember(name: "test") {members, count} }' http://localhost:3000/graphql
```

```shell
curl -XPOST -H "Content-Type:application/graphql"  -d 'query { count }' http://localhost:3000/graphql
```
