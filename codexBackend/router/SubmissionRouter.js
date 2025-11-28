// routes/SubmissionRouter.js
const express = require('express');
const { submitCode, getSubmissionHistory, getSubmissionById } = require('../controller/SubmissionController');
const { authMiddleware } = require('../middleware/auth');

const SubmissionRouter = express.Router();

SubmissionRouter.post('/:problemId/submit', authMiddleware, submitCode);
SubmissionRouter.get('/:problemId/submissions', authMiddleware, getSubmissionHistory);
SubmissionRouter.get('/submission/:submissionId', authMiddleware, getSubmissionById);

module.exports = SubmissionRouter;