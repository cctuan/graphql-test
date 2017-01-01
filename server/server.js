
import express from 'express'
import bodyParser from 'body-parser'
import { graphql } from 'graphql'
import schema from './graphql/schema'

const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.text({type : 'application/graphql'}))

app.post('/graphql', (req, res) => {
  graphql(schema, req.body).then(result => {
    res.send(JSON.stringify(result, null, 2))
  })
})

const server = app.listen(port, () => {
  console.info(`Started graphql server at PORT:${port}`)
})
