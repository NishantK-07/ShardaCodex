// utils/codeExecutor.js
const axios = require('axios');

// Language versions - MUST match your frontend language_VERSION
const LANGUAGE_VERSIONS = {
  javascript: "1.32.3",
  typescript: "1.32.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
  c: "10.2.0",
  cpp: "10.2.0",
};

// Create axios instance with Piston API base URL
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
  timeout: 10000, // 10 second timeout
});

// /**
//  * Execute code using Piston API
//  * @param {string} code - Source code to execute
//  * @param {string} language - Programming language
//  * @param {string} input - stdin input for the program
//  * @returns {Object} - Execution result: { output, error, timeout, executionTime, memoryUsed }
//  */
async function executeCode(code, language, input = "") {
  try {
    console.log(`Executing ${language} code with input:`, input);

    // Call Piston API - same structure as frontend
    const response = await API.post("/execute", {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: code,
        },
      ],
      stdin: input,
    });

    const data = response.data;
    console.log("Piston API response:", JSON.stringify(data, null, 2));

    // Check for compilation errors
    if (data.compile && data.compile.stderr) {
      return {
        output: '',
        error: data.compile.stderr,
        timeout: false,
        executionTime: 0,
        memoryUsed: 0,
      };
    }

    // Check for timeout signals
    const isTimeout = data.run.signal === 'SIGKILL' || data.run.signal === 'SIGTERM';

    // Check for runtime errors
    const hasError = data.run.stderr && data.run.stderr.trim().length > 0;

    // Return structured result
    return {
      output: data.run.output || data.run.stdout || '',
      error: hasError ? data.run.stderr : null,
      timeout: isTimeout,
      executionTime: Math.floor((data.run.time || 0) * 1000), // Convert seconds to milliseconds
      memoryUsed: 0, // Piston doesn't provide memory usage
    };

  } catch (error) {
    console.error("Code execution error:", error.message);

    // Handle API errors
    if (error.response) {
      // Piston API returned an error
      return {
        output: '',
        error: error.response.data?.message || 'Execution failed',
        timeout: false,
        executionTime: 0,
        memoryUsed: 0,
      };
    } else if (error.request) {
      // Request was made but no response
      return {
        output: '',
        error: 'Execution service unavailable',
        timeout: true,
        executionTime: 0,
        memoryUsed: 0,
      };
    } else {
      // Something else went wrong
      return {
        output: '',
        error: error.message || 'Unknown execution error',
        timeout: false,
        executionTime: 0,
        memoryUsed: 0,
      };
    }
  }
}

module.exports = { executeCode };