// Schema to create User model

const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Schema to create Job model. Each job could have damage to many rooms. Each job has many pieces of equipment
//MVP will use obj_id, could use company's equip id# @ later date if approved && they have that info

const roomSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    default: new Types.ObjectId(),
  },
  equipment: {
    type: String,
    required: true,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const jobSchema = new Schema(
  {
    jobName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    rooms: [roomSchema],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

jobSchema
  .virtual('roomCount')
  // Getter
  .get(function () {
    return this.rooms.length;

  })
.set(roomLength);

// Initialize our User model
const Job = model("Job", jobSchema);

module.exports = Job;
