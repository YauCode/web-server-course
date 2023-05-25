module.exports = `#graphql
    type Album {
        _id: ID,
        artist: String,
        title: String,
        year: Int,
        genre: String,
        tracks: Int
    }
    type Query {
        albums(
            _id: ID,
            artist: String,
            title: String,
            year: Int,
            genre: String,
            tracks: Int
        ): [Album]
        albumById(_id: ID): Album
    }
    type Mutation {
        deleteAlbum(_id: ID): [Album]
      }
      
`
