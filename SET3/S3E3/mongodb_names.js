require('dotenv').config()
const mongoose = require('mongoose')
const { CONN_STRING } = process.env

const fName = process.argv[2];
const lName = process.argv[3];

// MongoDB
mongoose.connect(CONN_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log("Database connected")
})

const nameSchema = new mongoose.Schema({
    firstname: String,
    lastname: String
},
    {
        versionKey: false,
    }
)
const Name = mongoose.model('Name', nameSchema)


if (fName && lName) {

    try {
        const name = new Name({
            firstname: fName,
            lastname: lName,
        })

        name.save().then(result => {
            console.log(name.firstname + " " + name.lastname + ' saved to database!')
            mongoose.connection.close()
        })
    } catch (error) {
        console.error(error);
    }


} else {
    try {
        Name.find({}).then(result => {
            result.forEach(name => {
                console.log(name)
            })
            mongoose.connection.close()
        })
    } catch (error) {
        console.error(error);
    }
}
