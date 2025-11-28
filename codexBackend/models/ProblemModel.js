// models/ProblemModel.js - UPDATE
const mongoose = require('mongoose');

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
    boilerplateCode: {
      type: String,
      required: true,
    },
    date_created: {
      type: Date,
      default: Date.now, 
    },
    // Sample test cases (visible to students)
    testCases: [
      {
        input: String,
        output: String,
      },
    ],
    // Hidden test cases (only used during submission)
    hiddenTestCases: [
      {
        input: String,
        output: String,
      },
    ],
    // Statistics
    totalSubmissions: {
      type: Number,
      default: 0,
    },
    acceptedSubmissions: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Virtual field for acceptance rate
ProblemSchema.virtual('acceptanceRate').get(function() {
  if (this.totalSubmissions === 0) return 0;
  return ((this.acceptedSubmissions / this.totalSubmissions) * 100).toFixed(2);
});

const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = Problem;