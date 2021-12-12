import mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    nick_name: { type: String },
    email: {
        type: String,
        trim: true,
        required: true,
        index: true,
    },
}, { collection: 'user' });

export default mongoose.model('User', userSchema);