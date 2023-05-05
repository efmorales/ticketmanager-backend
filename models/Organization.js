const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizationSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Your new organization must have a name."],
      unique: true,
      trim: true,
      maxLength: [100, "Exceeded character limit of 100."],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Your organization must have an assigned owner."],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [1000, "Exceeded character limit of 1,000."],
    },
    members: [{ type: Schema.Types.ObjectId, ref: "OrgMember" }], // TODO: Make this a virtual
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true },
  { strictQuery: true }
);

// ----- Org registration method -----
organizationSchema.statics.register = async function (newOrgData) {
  const { name, owner, description } = newOrgData;

  const orgNameExists = await this.findOne({ name });

  if (orgNameExists) {
    throw Error("This name is not available.");
  }

  const organization = await this.create({
    name,
    owner,
    description,
  });

  return organization;
};

module.exports = mongoose.model("Organization", organizationSchema);
