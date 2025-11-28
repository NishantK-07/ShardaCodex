const express=require("express")
const { getAllProblems, getProblemById, getAllProblemsWithStatus,
  getProblemByIdWithStatus ,createProblem, updateProblem, deleteProblem }=require("../controller/ProblemController")

const ProblemRouter=express.Router();

const { authMiddleware,optionalAuth ,teacherMiddleware } = require('../middleware/auth'); // Middleware that adds user if token exists

// Student/Guest access
ProblemRouter.get('/', optionalAuth, getAllProblemsWithStatus);
ProblemRouter.get('/:id', optionalAuth, getProblemByIdWithStatus);

// Teacher-only access
ProblemRouter.post('/createProblem', authMiddleware, teacherMiddleware, createProblem);
ProblemRouter.put('/:id', authMiddleware, teacherMiddleware, updateProblem);
ProblemRouter.delete('/:id', authMiddleware, teacherMiddleware, deleteProblem);

module.exports = ProblemRouter;