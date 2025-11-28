// models/CodeDraftModel.js
const mongoose = require('mongoose');

const CodeDraftSchema = new mongoose.Schema(
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
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      enum: ['javascript', 'python', 'java', 'cpp', 'c'],
      default: 'javascript',
    },
    savedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Compound index to ensure one draft per user per problem per language
CodeDraftSchema.index({ userId: 1, problemId: 1, language: 1 }, { unique: true });

const CodeDraft = mongoose.model('CodeDraft', CodeDraftSchema);

module.exports = CodeDraft;