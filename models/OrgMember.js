const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcrypt");

const orgMember = Schema(
  {
    parentOrg: {
      type: Schema.Types.ObjectId,
      required: [true, "Members must belong to an organization."],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "New memberships must have a user associated."],
    },
    permissions: {
      type: String,
      required: true,
      enum: ["owner", "super_admin", "admin", "user"],
      default: "user",
    },
    title: String,
    about: {
      type: String,
      maxLength: [1000, "Exceeded character limit of 1,000."],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true },
  { strictQuery: true }
);

// // Will run BEFORE any query (".find...")
// orgMember.pre(/^find/, function (next) {
//   this.populate({ // Calls first field to populate
//     path: "user", // Field in this schema that will be populated
//     select: "name", // Properties to populate from that field. "-" for exclude.
//   })

//   next();
// });

// TODO: Create index for userId/parentOrg
orgMember.statics.register = async function (userId, orgId, permissions) {
  const newMember = await this.create({
    parentOrg: orgId,
    user: userId,
    permissions,
  });

  return newMember;
};

module.exports = mongoose.model("OrgMember", orgMember);
