const mongoose = require('mongoose');

// Define schema for the problem
const ProblemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    constraints: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: true,
    },
    date_created: {
      type: Date,
      default: Date.now, 
    },
    testCases: [
      {
        input: String,
        output: String,
      },
    ],
  },
  { timestamps: true }
);

// Create the model
const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = Problem;
