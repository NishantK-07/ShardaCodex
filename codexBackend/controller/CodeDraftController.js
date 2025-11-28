// controller/CodeDraftController.js
const CodeDraft = require('../models/Codedraftmodels(autosave0)');
const UserProblemStatus = require('../models/Userproblemstatus');

// Save or update code draft
async function saveDraft(req, res) {
  const { problemId } = req.params;
  const { code, language } = req.body;
  const userId = req.user._id; // Assuming you have auth middleware that adds user to req

  try {
    // Update or create draft
    const draft = await CodeDraft.findOneAndUpdate(
      { userId, problemId, language },
      { 
        code, 
        savedAt: new Date() 
      },
      { upsert: true, new: true }
    );

    // Update problem status to 'attempted' if not already solved
    await UserProblemStatus.findOneAndUpdate(
      { userId, problemId },
      { 
        status: 'attempted',
        lastAttemptedAt: new Date()
      },
      { upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      message: 'Draft saved successfully',
      savedAt: draft.savedAt,
    });
  } catch (error) {
    console.error('Error saving draft:', error);
    res.status(500).json({ message: 'Error saving draft' });
  }
}

// Get saved draft for a problem
async function getDraft(req, res) {
  const { problemId } = req.params;
  const { language } = req.query;
  const userId = req.user._id;

  try {
    const draft = await CodeDraft.findOne({ userId, problemId, language });
    
    if (!draft) {
      return res.status(404).json({ message: 'No draft found' });
    }

    res.status(200).json({
      code: draft.code,
      savedAt: draft.savedAt,
    });
  } catch (error) {
    console.error('Error fetching draft:', error);
    res.status(500).json({ message: 'Error fetching draft' });
  }
}

module.exports = { saveDraft, getDraft };