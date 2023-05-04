const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const OrgMember = require("../models/OrgMember");

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

    // Custom validator, must return boolean
    // property: {
    //   type: Number,
    //   validate: {
    //     validator: function (inputToValidate) {
    //       /* thing to validate */
    //               "this" only point to this document when creating new, not on updating
    //       return inputToValidate < operator > this.schemaProperty;
    //     },
    //     message: "Displayed if validation failed. ({VALUE})" <- value = inputToValidate
    //   }
    // }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true },
  { strictQuery: true }
);

// .populate({
//   path: "property", // The thing you want to populate, only one per .populate. Multiple can be chained
//   select: "-property -otherProperty" // The thing you want to show, + for show, - for do not show. Only + or -, not both
// })

// // Will run BEFORE .save or .create
// organizationSchema.pre("save", function ( next ) {
//   console.log(this);
//   next();
// })

// // Will run BEFORE any query (".find...")
// organizationSchema.pre(/^find/, function (next) {
//   this.populate({ // Calls first field to populate
//     path: "owner", // Field in this schema that will be populated
//     select: "_id name", // Properties to populate from that field. "-" for exclude.

//     // Second populate call. Example, not actual fields in the current schema
//   }).populate({ // Second populate call, example,
//     path: "user", // Field in this schema that will be populated
//     select: "_id name bio" // Properties to populate from that field. "-" for exclude.
//   });

//   next();
// });

// // Will run after .save or .create, "doc" is the created document
// organizationSchema.post("save", function ( doc, next ) {
//   console.log(this);
//   next();
// })

// ----- VIRTUALS -----

// TODO: Create Members model (user, role/permissions, title, etc.), import it as a virtual into "members" for organization

// - Virtuals are properties that do not exist in the schema, but we "virtually" create and return with the document
// - Good for when the "parent" does not know about the "children"
// - Does not persist in the db, but is returned in teh document as if it is

// // Virtual Populate:
// // "virtualPropertyName" is the property that will appear on the returned object
// organizationSchema.virtual("virtualPropertyName", {
//   ref: "RefModel", // Model that will be referenced
//   // "fieldToImport" is the field on the foreign model that will be imported
//   foreignField: "fieldToImport",
//   localField: "fieldToImportTo",
// });

// // Use this to add owner as member ??
// // Will run after .save or .create, "doc" is the created document
// organizationSchema.pre("save", async function ( doc, next ) {
//     await OrgMember.register(this.owner, this._id, "owner")
// })

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
