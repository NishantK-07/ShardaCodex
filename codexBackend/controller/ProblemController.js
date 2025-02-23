const Problem = require('../models/ProblemModel');

// Controller to get all problems
async function getAllProblems(req, res){
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching problems' });
  }
};

// Controller to get a single problem by ID
async function getProblemById(req, res){
  const { id } = req.params;
  try {
    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.status(200).json(problem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching problem' });
  }
};

// Controller to create a new problem
async function createProblem(req, res){
    const { title, description, constraints, difficulty, testCases } = req.body;
    
    // Validate that difficulty is one of the predefined values
    if (!['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      return res.status(400).json({ message: 'Invalid difficulty level' });
    }
    
    try {
        const newProblem = await Problem.create({
            title,
            description,
            constraints,
            difficulty,
            testCases,
            });
          
        res.status(201).json({
          message:"problem created",
          newProblem:newProblem
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating problem' });
    }
  };

// Controller to update an existing problem
async function updateProblem(req, res) {
    const { id } = req.params;
    const { title, description, constraints, difficulty, testCases } = req.body; // include all fields
    
    try {
      // Retrieve the existing problem first
      const problem = await Problem.findById(id);
      
      if (!problem) {
        return res.status(404).json({ message: 'Problem not found' });
      }
  
      // Update the problem fields manually
      problem.title = title;
      problem.description = description;
      problem.constraints = constraints;
      problem.difficulty = difficulty;
      problem.testCases = testCases;
  
      // Save the updated problem
      await problem.save();
  
      // Return the updated problem
      res.status(200).json(problem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating problem' });
    }
  };
// Controller to delete a problem
async function deleteProblem(req, res){
  const { id } = req.params;
  try {
    const deletedProblem = await Problem.findByIdAndDelete(id);
    if (!deletedProblem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.status(200).json({ message: 'Problem deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting problem' });
  }
};

module.exports = { getAllProblems, getProblemById, createProblem, updateProblem, deleteProblem };
