// models/SubmissionModel.js
const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema(
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
    },
    status: {
      type: String,
      enum: ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compilation Error'],
      required: true,
    },
    testCasesPassed: {
      type: Number,
      required: true,
      default: 0,
    },
    totalTestCases: {
      type: Number,
      required: true,
    },
    executionTime: {
      type: Number, // in milliseconds
      default: 0,
    },
    memoryUsed: {
      type: Number, // in KB
      default: 0,
    },
    testCaseResults: [
      {
        input: String,
        expectedOutput: String,
        actualOutput: String,
        status: {
          type: String,
          enum: ['Passed', 'Failed', 'Error', 'TLE'],
        },
        executionTime: Number,
      },
    ],
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for faster queries
SubmissionSchema.index({ userId: 1, problemId: 1, submittedAt: -1 });

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;