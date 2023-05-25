const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, 'Make is required'],
    maxLength: 30,
  },
  model: String,
  type: {
    type: String,
    required: [true, 'Type is required'],
  },
  license_plate: {
    type: String,
    //Custom Validator
    validate: {
      validator: function (v) {
        return /^[a-zA-Z]{3}-\d{3}$/.test(v)
      },
      message: props => `${props.value} is not a valid for standard Finnish license plates pattern: 3 letters - 3 numbers (e.g. ABC-123)`
    },
    required: [true, 'License plate required']
  }
})

module.exports = mongoose.model('Vehicle', vehicleSchema, 'vehicles')
