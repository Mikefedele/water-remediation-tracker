const { Schema, model, Types } = require('mongoose');
// const ObjectId = mongoose.SchemaType.ObjectId;

//going to keep reaction schema in this file 
//instead of export


const roomSchema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
        default: new Types.ObjectId
    },
    equipment: {
      type: String,
      required: true,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount')
.get(function () {
  const reactionLength = this.reactions.length;
  return `${reactionLength}`;
})
// .set(reactionLength);

const Room = model('Room', roomSchema);




module.exports = Room 
