import mongoose = require('mongoose');
export const initiateMongooseConnection = async () => {
    await mongoose.connect('db url');
}
