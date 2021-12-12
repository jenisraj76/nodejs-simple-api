import mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema = new Schema({
    comment: { type: String },
    post_id: {
      type: Schema.Types.ObjectId, ref: 'Post'
    },
  }, { collection: 'post_comment' });

export default mongoose.model('PostComment', commentSchema);