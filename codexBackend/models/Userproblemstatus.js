// models/UserProblemStatusModel.js
const mongoose = require('mongoose');

const UserProblemStatusSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CodexUser',
      required: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem',
      required: true,
    },
    status: {
      type: String,
      enum: ['not_attempted', 'attempted', 'solved'],
      default: 'not_attempted',
    },
    attempts: {
      type: Number,
      default: 0,
    },
    lastAttemptedAt: {
      type: Date,
    },
    solvedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Compound unique index
UserProblemStatusSchema.index({ userId: 1, problemId: 1 }, { unique: true });

const UserProblemStatus = mongoose.model('UserProblemStatus', UserProblemStatusSchema);

module.exports = UserProblemStatus;