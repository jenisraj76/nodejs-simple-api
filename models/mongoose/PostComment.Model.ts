import mongoose = require('mongoose');
var Schema = mongoose.Schema;
var likeSchema = new Schema({
    like: { type: Boolean },
    post_id: {
        type: Schema.Types.ObjectId, ref: 'Post'
    },
}, { collection: 'post_like' });


export default mongoose.model('PostLike', likeSchema);