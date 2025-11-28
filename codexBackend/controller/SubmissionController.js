// controller/SubmissionController.js
const Submission = require('../models/Submissionmodel');
const Problem = require('../models/ProblemModel');
const UserProblemStatus = require('../models/Userproblemstatus');
const { executeCode } = require('../utils/codeExecutor'); // Your existing code execution logic

// Submit code for evaluation
// controller/SubmissionController.js - UPDATED submitCode function

async function submitCode(req, res) {
  const { problemId } = req.params;
  const { code, language } = req.body;
  const userId = req.user._id;

  try {
    // Get problem with all test cases
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Combine visible and hidden test cases
    const allTestCases = [
      ...problem.testCases,
      ...(problem.hiddenTestCases || []), // Handle if hiddenTestCases doesn't exist
    ];

    // Execute code against all test cases
    const testCaseResults = [];
    let passedCount = 0;
    let totalExecutionTime = 0;
    let finalStatus = 'Accepted';

    for (const testCase of allTestCases) {
      try {
        // Execute code against test case
        const result = await executeCode(code, language, testCase.input);
        
        console.log(`Test case execution:`, {
          input: testCase.input,
          expected: testCase.output,
          actual: result.output,
          error: result.error,
          timeout: result.timeout,
        });

        // Clean and compare outputs
        const actualOutput = (result.output || '').trim();
        const expectedOutput = (testCase.output || '').trim();
        
        // Determine if test passed (no error, no timeout, outputs match)
        const isPassed = actualOutput === expectedOutput && !result.error && !result.timeout;
        
        // Determine status
        let status;
        if (result.error) {
          status = 'Error';
        } else if (result.timeout) {
          status = 'TLE';
        } else if (isPassed) {
          status = 'Passed';
        } else {
          status = 'Failed';
        }

        // Store test case result
        testCaseResults.push({
          input: testCase.input,
          expectedOutput: testCase.output,
          actualOutput: actualOutput,
          status,
          executionTime: result.executionTime || 0,
        });

        // Update counters
        if (isPassed) {
          passedCount++;
        } else if (finalStatus === 'Accepted') {
          // Update final status on first failure
          if (result.error) {
            finalStatus = 'Runtime Error';
          } else if (result.timeout) {
            finalStatus = 'Time Limit Exceeded';
          } else {
            finalStatus = 'Wrong Answer';
          }
        }

        totalExecutionTime += result.executionTime || 0;

        // Add small delay to avoid rate limiting (optional but recommended)
        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (error) {
        console.error('Test case execution error:', error);
        finalStatus = 'Runtime Error';
        testCaseResults.push({
          input: testCase.input,
          expectedOutput: testCase.output,
          actualOutput: '',
          status: 'Error',
          executionTime: 0,
        });
      }
    }

    // Create submission record
    const submission = await Submission.create({
      userId,
      problemId,
      code,
      language,
      status: finalStatus,
      testCasesPassed: passedCount,
      totalTestCases: allTestCases.length,
      executionTime: totalExecutionTime,
      testCaseResults,
      submittedAt: new Date(),
    });

    // Update user problem status
    const statusUpdate = {
      $inc: { attempts: 1 },
      lastAttemptedAt: new Date(),
    };

    if (finalStatus === 'Accepted') {
      statusUpdate.status = 'solved';
      statusUpdate.solvedAt = new Date();
      
      // Update problem statistics
      await Problem.findByIdAndUpdate(problemId, {
        $inc: { totalSubmissions: 1, acceptedSubmissions: 1 },
      });
    } else {
      statusUpdate.status = 'attempted';
      
      // Update only total submissions
      await Problem.findByIdAndUpdate(problemId, {
        $inc: { totalSubmissions: 1 },
      });
    }

    await UserProblemStatus.findOneAndUpdate(
      { userId, problemId },
      statusUpdate,
      { upsert: true, setDefaultsOnInsert: true }
    );

    // Prepare response with hidden test cases masked
    res.status(200).json({
      submissionId: submission._id,
      status: finalStatus,
      testCasesPassed: passedCount,
      totalTestCases: allTestCases.length,
      executionTime: `${totalExecutionTime}ms`,
      testCaseResults: testCaseResults.map(tc => {
        // Check if this test case is in visible test cases
        const isVisible = problem.testCases.some(visibleTc => 
          visibleTc.input === tc.input && visibleTc.output === tc.expectedOutput
        );
        
        return {
          ...tc,
          // Hide input/output for hidden test cases
          input: isVisible ? tc.input : 'Hidden',
          expectedOutput: isVisible ? tc.expectedOutput : 'Hidden',
          actualOutput: isVisible ? tc.actualOutput : 'Hidden',
        };
      }),
    });

  } catch (error) {
    console.error('Error submitting code:', error);
    res.status(500).json({ 
      message: 'Error processing submission',
      error: error.message 
    });
  }
}
// Get submission history for a problem
async function getSubmissionHistory(req, res) {
  const { problemId } = req.params;
  const userId = req.user._id;

  try {
    const submissions = await Submission.find({ userId, problemId })
      .sort({ submittedAt: -1 })
      .select('-code -testCaseResults'); // Exclude code and detailed results from list

    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'Error fetching submissions' });
  }
}

// Get detailed submission by ID
async function getSubmissionById(req, res) {
  const { submissionId } = req.params;
  const userId = req.user._id;

  try {
    const submission = await Submission.findOne({ _id: submissionId, userId });
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.status(200).json(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ message: 'Error fetching submission' });
  }
}

module.exports = { submitCode, getSubmissionHistory, getSubmissionById };