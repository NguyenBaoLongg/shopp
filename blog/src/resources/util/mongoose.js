module.exports = {
    mutippleMongooseToObject: function (mongoose) {
        return mongoose.map((mongoose) => mongoose.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
