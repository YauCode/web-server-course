require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const AlbumAPI = require('./datasources/AlbumApi')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { ApolloServerPluginLandingPageDisabled } = require('@apollo/server/plugin/disabled')

const { MONGODB_URI } = process.env
const connectMongoDB = require('./db/mongodb')

const typeDefs = require('./schema')

const resolvers = require('./resolvers/resolvers')
connectMongoDB(MONGODB_URI)

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const start = async () => {
    const { url } = await startStandaloneServer(server, {
        context: async () => {
            return {
                dataSources: {
                    AlbumAPI: new AlbumAPI(),
                }
            }
        }
    })
    console.log(`Server ready at ${url}`)
}
start()
