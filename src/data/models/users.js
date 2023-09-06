/**
 * The following is a sample database schema with Mongoose for Mongo Db
 * Replace this with your own database schemas
 */

const db = require("mongoose");
const { Schema, model } = db;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    hash: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
    query: {
      byEmail(email) {
        return this.where({ email });
      },
    },
  }
);

module.exports = model("User", userSchema);
