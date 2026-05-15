import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  songs: [

    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sound"
    }

  ],

  isPublic: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true
})

export default mongoose.model(
  "Playlist",
  playlistSchema
)