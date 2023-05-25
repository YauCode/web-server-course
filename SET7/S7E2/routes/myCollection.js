const express = require('express')
const router = express.Router()


// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
    res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Albums Collection</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
            integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    
    </head>
    
    <body>
        <div class="container">
            <nav class="navbar bg-light mb-3">
                <div class="container-fluid">
                    <a class="navbar-brand">Album collection app</a>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Filter" id="searchField"
                            aria-label="Search">
                    </form>
                    
                    <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
                
                    <li class="nav-item">
                    <h3>Hi, ${req.user.username}</h3>
                    </li>
                    <li class="nav-item">
                    <form action="/logout" method="post">
                    <div>
                        <button type="submit" class="btn btn-secondary">Logout</button>
                    </div>
                </form>
                    </li>
                  </ul>

                </div>
            </nav>
            <div class="container">
                <div class="row">
    
                    <div class="row">
                        <form>
                            <div class="row pb-2">
                                <div class="form-group col-sm-6">
                                    <label for="artist">Artist</label>
                                    <input name="artist" type="text" class="form-control" id="artist"
                                        placeholder="Enter artist...">
                                    <small class="form-alert"></small>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="title">Album title</label>
                                    <input name="title" type="text" class="form-control" id="title"
                                        placeholder="Enter title...">
    
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="year">Year</label>
                                    <input name="year" type="number" class="form-control" id="year"
                                        placeholder="Enter year...">
    
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="genre">Genre</label>
                                    <input name="genre" type="text" class="form-control" id="genre"
                                        placeholder="Enter genre...">
    
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="tracks">Tracks</label>
                                    <input name="tracks" type="number" class="form-control" id="tracks"
                                        placeholder="Enter tracks...">
    
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div class="row pt-4">
                        <h2>List of albums:</h2>
                        <div class="result"></div>
                    </div>
    
                </div>
            </div>
        </div>
    
    
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.min.js"
            integrity="sha512-odNmoc1XJy5x1TMVMdC7EMs3IVdItLPlCeL5vSUPN2llYKMJ2eByTTAIiiuqLg+GdNr9hF6z81p27DArRFKT7A=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="albumsScript.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js"
            integrity="sha384-ODmDIVzN+pFdexxHEHFBQH3/9/vQ9uori45z4JjnFsRydbmQbmL5t1tQ0culUzyK"
            crossorigin="anonymous"></script>
    
    
    </body>
    
    </html>`)
})
module.exports = router