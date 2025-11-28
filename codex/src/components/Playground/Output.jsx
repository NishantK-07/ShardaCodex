// import React, { useState } from 'react'
// import { executeCode } from '@/lib/api';
// import { usecode } from './CodeContext';
// // import Testcase from '../Testcase';
// import axios from 'axios';
// // function Output({language,codeRef}) {
//   function Output({problemId}) {
//     const {language,codeRef}=usecode();
//     const [output,setoutput]=useState(null);
//     const [testResults, setTestResults] = useState([]);
//     const runCode=async ()=>{
//         const sourcecode=codeRef.current.getValue();
//         if(!sourcecode){
//             return;
//         }
//         try {
//             const response = await axios.get(`http://localhost:3010/api/problem/${problemId}`);
//             console.log(response)
//             const testCases = response.data.testCases;
      
//             const results=[];

//             // const results = await Promise.all(testCases.map(async (testCase) => {


//             for (let i = 0; i < testCases.length; i++) {
//               const testCase = testCases[i];
//               const { input, output: expectedOutput } = testCase;
  
//               // Wait 200ms before sending the next request
//               await new Promise(resolve => setTimeout(resolve, 200));  // delay of 200ms
  
//               const result = await executeCode(language, sourcecode, input);
//               const passed = result.run.output.trim() === expectedOutput.trim();
              
//               results.push({
//                   input: testCase.input,
//                   expectedOutput: testCase.output,
//                   actualOutput: result.run.output.trim(),
//                   passed,
//               });
//           }
//             setTestResults(results)
//         } catch (error) {
//             console.log(error)
//         }
//     }
//   return (
//     <>
//     <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }} className="   outline-4 outline-black bg-white">
//         <button  className=" bg-gray-600 text-white" 
//         onClick={runCode}
//         >Run Code</button>
//         {/* <div>
//             {output ? output: 'click "Run Code" to see the output here'}
//         </div> */}
//         <div>
//         {testResults.length > 0 ? (
//           testResults.map((result, index) => (
//             <div key={index}>
//               <strong>Test Case {index + 1}:</strong><br />
//               <strong>Input:</strong> {result.input}<br />
//               <strong>Expected Output:</strong> {result.expectedOutput}<br />
//               <strong>Actual Output:</strong> {result.actualOutput}<br />
//               <strong>Status:</strong> {result.passed ? 'Pass' : 'Fail'}<br /><br />
//             </div>
//           ))
//         ) : (
//           'Click "Run Code" to see the output here'
//         )}
//       </div>
//       </div>
//     </>
//   )
// }

// export default Output
// Output.jsx - UPDATED
import React, { useState } from 'react';
import { executeCode } from '@/lib/api';
import { usecode } from './CodeContext';
import axios from 'axios';

function Output({ problemId }) {
  const { language, codeRef } = usecode();
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Run Code - Only visible test cases
  const runCode = async () => {
    const sourcecode = codeRef.current.getValue();
    if (!sourcecode) {
      return;
    }
    
    try {
      setIsRunning(true);
      setSubmissionResult(null); // Clear previous submission result
      
      const response = await axios.get(`http://localhost:3010/api/problem/${problemId}`);
      const testCases = response.data.testCases;

      const results = [];

      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        const { input, output: expectedOutput } = testCase;

        await new Promise(resolve => setTimeout(resolve, 200));

        const result = await executeCode(language, sourcecode, input);
        const passed = result.run.output.trim() === expectedOutput.trim();

        results.push({
          input: testCase.input,
          expectedOutput: testCase.output,
          actualOutput: result.run.output.trim(),
          passed,
        });
      }
      setTestResults(results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRunning(false);
    }
  };

  // Submit Code - All test cases (including hidden)
  const submitCode = async () => {
    const sourcecode = codeRef.current.getValue();
    if (!sourcecode) {
      alert('Please write some code before submitting');
      return;
    }

    try {
      setIsSubmitting(true);
      setTestResults([]); // Clear run results
      
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        `http://localhost:3010/api/submissions/${problemId}/submit`,
        {
          code: sourcecode,
          language: language,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubmissionResult(response.data);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        className="outline-4 outline-black bg-white"
      >
        {/* Action Buttons */}
        <div className="flex gap-2 p-2 border-b bg-gray-50">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
            onClick={runCode}
            disabled={isRunning || isSubmitting}
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
            onClick={submitCode}
            disabled={isRunning || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-auto p-4">
          {/* Submission Result */}
          {submissionResult && (
            <div className="mb-4 p-4 rounded-lg border-2" 
              style={{
                backgroundColor: submissionResult.status === 'Accepted' ? '#d4edda' : '#f8d7da',
                borderColor: submissionResult.status === 'Accepted' ? '#28a745' : '#dc3545'
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">
                  {submissionResult.status === 'Accepted' ? '✓ Accepted' : '✗ ' + submissionResult.status}
                </h3>
                <span className="text-sm">
                  {submissionResult.testCasesPassed}/{submissionResult.totalTestCases} test cases passed
                </span>
              </div>
              
              <div className="text-sm text-gray-700">
                <p>Execution Time: {submissionResult.executionTime}</p>
              </div>

              {/* Show test case results */}
              <div className="mt-3 space-y-2">
                <h4 className="font-semibold">Test Cases:</h4>
                {submissionResult.testCaseResults.map((tc, index) => (
                  <div key={index} className="bg-white p-2 rounded text-xs">
                    <div className="flex justify-between">
                      <span className="font-semibold">Test Case {index + 1}:</span>
                      <span className={tc.status === 'Passed' ? 'text-green-600' : 'text-red-600'}>
                        {tc.status}
                      </span>
                    </div>
                    {tc.input !== 'Hidden' && (
                      <>
                        <div><strong>Input:</strong> {tc.input}</div>
                        <div><strong>Expected:</strong> {tc.expectedOutput}</div>
                        <div><strong>Got:</strong> {tc.actualOutput}</div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Run Code Results */}
          {testResults.length > 0 && !submissionResult && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Sample Test Results:</h3>
              {testResults.map((result, index) => (
                <div key={index} className="mb-3 p-3 bg-gray-50 rounded border">
                  <div className="flex justify-between mb-1">
                    <strong>Test Case {index + 1}</strong>
                    <span className={result.passed ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                      {result.passed ? '✓ Pass' : '✗ Fail'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div><strong>Input:</strong> {result.input}</div>
                    <div><strong>Expected Output:</strong> {result.expectedOutput}</div>
                    <div><strong>Actual Output:</strong> {result.actualOutput}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Default message */}
          {!submissionResult && testResults.length === 0 && (
            <div className="text-gray-500 text-center py-8">
              Click "Run Code" to test with sample cases or "Submit" to evaluate all test cases
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Output;