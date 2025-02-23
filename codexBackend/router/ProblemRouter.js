const express=require("express")
const { getAllProblems, getProblemById, createProblem, updateProblem, deleteProblem }=require("../controller/ProblemController")

const ProblemRouter=express.Router();


// Routes for Problem CRUD operations
ProblemRouter.get('/', getAllProblems); 
ProblemRouter.get('/:id', getProblemById);
ProblemRouter.post('/createProblem', createProblem); 
ProblemRouter.put('/:id', updateProblem); 
ProblemRouter.delete('/:id', deleteProblem);  

module.exports = ProblemRouter;