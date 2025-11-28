// routes/CodeDraftRouter.js
const express = require('express');
const { saveDraft, getDraft } = require('../controller/CodeDraftController');
const { authMiddleware } = require('../middleware/auth'); // Your auth middleware

const CodeDraftRouter = express.Router();

CodeDraftRouter.post('/:problemId/save-draft', authMiddleware, saveDraft);
CodeDraftRouter.get('/:problemId/draft', authMiddleware, getDraft);

module.exports = CodeDraftRouter;