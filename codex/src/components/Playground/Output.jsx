import React, { useState } from 'react'
import { executeCode } from '@/lib/api';
import { usecode } from './CodeContext';
// import Testcase from '../Testcase';
import axios from 'axios';
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
            const response = await axios.get(`http://localhost:3010/api/problem/${problemId}`);
            console.log(response)
            const testCases = response.data.testCases;
      
            const results=[];

            // const results = await Promise.all(testCases.map(async (testCase) => {


            for (let i = 0; i < testCases.length; i++) {
              const testCase = testCases[i];
              const { input, output: expectedOutput } = testCase;
  
              // Wait 200ms before sending the next request
              await new Promise(resolve => setTimeout(resolve, 200));  // delay of 200ms
  
              const result = await executeCode(language, sourcecode, input);
              const passed = result.run.output.trim() === expectedOutput.trim();
              
              results.push({
                  input: testCase.input,
                  expectedOutput: testCase.output,
                  actualOutput: result.run.output.trim(),
                  passed,
              });
          }
            setTestResults(results)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }} className="   outline-4 outline-black bg-white">
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
