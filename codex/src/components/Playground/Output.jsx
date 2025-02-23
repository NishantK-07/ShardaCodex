import React, { useState } from 'react'
import { executeCode } from '@/lib/api';
import { usecode } from './CodeContext';

// function Output({language,codeRef}) {
  function Output({problemId}) {
    const {language,codeRef}=usecode();
    const [output,setoutput]=useState(null);
    const [testResults, setTestResults] = useState([]);
    const runCode=async ()=>{
        const sourcecode=codeRef.current.getValue();
        if(!sourcecode){
            return;
        }
        try {
            // const {run:result}=await executeCode(language,sourcecode,problemId)
            // setoutput(result.output)

            const response = await axios.get(`http://localhost:3010/api/problem/${problemId}`);
            console.log(response)
            const testCases = response.data.testCases;
      
            const results = await Promise.all(testCases.map(async (testCase) => {
              const result = await executeCode(language, sourceCode, problemId);
              return {
                passed: result.run.output.trim() === testCase.output.trim(),
                input: testCase.input,
                expectedOutput: testCase.output,
                actualOutput: result.run.output.trim(),
              };
            }));
            setTestResults(results)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }} className=" ml-4  outline-4 outline-black bg-white">
        <button  className=" bg-gray-600 text-white" 
        onClick={runCode}
        >Run Code</button>
        {/* <div>
            {output ? output: 'click "Run Code" to see the output here'}
        </div> */}
        <div>
        {testResults.length > 0 ? (
          testResults.map((result, index) => (
            <div key={index}>
              <strong>Test Case {index + 1}:</strong><br />
              <strong>Input:</strong> {result.input}<br />
              <strong>Expected Output:</strong> {result.expectedOutput}<br />
              <strong>Actual Output:</strong> {result.actualOutput}<br />
              <strong>Status:</strong> {result.passed ? 'Pass' : 'Fail'}<br /><br />
            </div>
          ))
        ) : (
          'Click "Run Code" to see the output here'
        )}
      </div>
      </div>
    </>
  )
}

export default Output
