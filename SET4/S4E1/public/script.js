const result = document.querySelector('.result')
const baseUrl = `${window.location.origin}/api`
const fetchAlbums = async () => {
    try {
        // eslint-disable-next-line no-undef
        const { data } = await axios.get(`${baseUrl}/albums`)
        console.log(data)

        const albums = data.data.map((album) => {
            return createAlbumCard(album)
            //return `<ul><li>Artist: ${album.artist}</li><li>Album title: ${album.title}</li><li>Year: ${album.year}</li><li>Genre: ${album.genre}</li><li>Tracks: ${album.tracks}</li></ul>`
        })
        result.innerHTML = `<div class="row">
        ${albums.join('')} 
       </div>`

    } catch (error) {
        console.log(error)
        result.innerHTML = '<div class="alert alert-danger">Could not fetch data</div>'
    }
}

const createAlbumCard = (album) => {
    return `<div class="col-sm-4 pt-2">
              <div class="card">
                <div class="card-body">
                <h5 class="card-title">${album.title}</h5>
                <p class="card-text">Artist: ${album.artist}</p>
                <p class="card-text">Year: ${album.year}</p>
                <p class="card-text">Genre:  ${album.genre}</p>
                <p class="card-text">Tracks: ${album.tracks}</p>
                </div>
              </div>
            </div>
            `
}



// Empty form fields
const emptyFields = (artist, title, year, genre, tracks) => {
    artist.value = ''
    title.value = ''
    year.value = ''
    genre.value = ''
    tracks.value = ''
}



// Submit form
const btn = document.querySelector('.btn-primary')
const artist = document.querySelector('#artist')
const title = document.querySelector('#title')
const year = document.querySelector('#year')
const genre = document.querySelector('#genre')
const tracks = document.querySelector('#tracks')

btn.addEventListener('click', async (e) => {
    e.preventDefault()
    const artistValue = artist.value
    const titleValue = title.value
    const yearValue = year.value
    const genreValue = genre.value
    const tracksValue = tracks.value

    try {
        // eslint-disable-next-line no-undef
        const { data } = await axios.post(`${baseUrl}/albums`, { artist: artistValue, title: titleValue, year: yearValue, genre: genreValue, tracks: tracksValue })
        console.log(data)
        fetchAlbums()
        emptyFields(artist, title, year, genre, tracks)
    } catch (error) {
        console.log(error)

    }
})

fetchAlbums()
