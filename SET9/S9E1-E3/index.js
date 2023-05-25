const { ApolloServer } = require('@apollo/server')
const AlbumAPI = require('./datasources/AlbumApi')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { ApolloServerPluginLandingPageDisabled } = require('@apollo/server/plugin/disabled')

const typeDefs = require('./schema')

const resolvers = require('./resolvers/resolvers')

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
