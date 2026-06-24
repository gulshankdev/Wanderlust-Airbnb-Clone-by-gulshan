const { required } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;
// const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema({
  email: { type: String,
     required: true,
      unique: true 
    },
 
});

userSchema.plugin(passportLocalMongoose,{usernameField: 'email'});

module.exports = mongoose.model('User', userSchema);
