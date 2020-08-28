const mongoose = require("mongoose");
const { Schema } = mongoose;
const { hashString, hashCompare } = require("../../utils/hash");
const { signToken } = require("../../utils/jwt");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate Hashedpassword

  await hashString(user.password)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((e) => next(e));
});

userSchema.statics.findByEmail = async function (email) {
  const response = await this.findOne({ email });
  return response;
};

userSchema.statics.register = async function ({
  email,
  first_name,
  last_name,
  password,
}) {
  return new Promise((resolve, reject) => {
    const user = new this({
      email,
      first_name,
      last_name,
      password,
    });
    user
      .save()
      .then((data) =>
        signToken(data)
          .then((token) => {
            resolve(token);
          })
          .catch((e) => {
            reject(e);
          })
      )
      .catch((e) => {
        reject(e);
      });
  });
};

userSchema.statics.login = async function ({ email, password }) {
  return new Promise((resolve, reject) => {
    const user = this.findOne({ email }).select("+password").exec();
    user
      .then((user) =>
        hashCompare(user.password, password)
          .then(() =>
            signToken(user)
              .then((token) => {
                resolve(token);
              })
              .catch((e) => {
                reject(e);
              })
          )
          .catch((e) => reject(e))
      )
      .catch((e) => reject(e));
  });
};

mongoose.model("User", userSchema);
