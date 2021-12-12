import mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postSchema = new Schema({
    post: { type: String },
    user_id: {
      type: Schema.Types.ObjectId, ref: 'User'
    },
  }, { collection: 'post' });
  
export default mongoose.model('Post', postSchema);