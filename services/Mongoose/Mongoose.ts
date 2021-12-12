import User from '../../models/mongoose/User.Model';

export const getUserDetail = async () => {
  return await User.aggregate([
    {
      $lookup: {
        from: "post",
        as: 'p',
        foreignField: "_id",
        localField: "user_id",
        pipeline: [
          {
            $lookup: {
              from: "post_comment",
              as: 'p.post_comment',
              foreignField: "p._id",
              localField: "post_id"
            },
          },
          {
            $lookup: {
              from: "post_like",
              as: 'p.post_like',
              foreignField: "p._id",
              localField: "post_id"
            },
          },
        ]
      },
    },

  ]).exec();
}
