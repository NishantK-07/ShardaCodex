import axios from 'axios';
import React from 'react'
import { useState,useEffect } from 'react';
function ProblemDesc({problemId}) {
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/api/problem/${problemId}`);
        console.log(response)
        // const data = await response.json();
        // setProblem(data);
        setProblem(response.data)
      } catch (error) {
        console.error('Error fetching problem:', error);
      }
    };
    
    fetchProblem();
  }, [problemId]);

  if (!problem) return <div>Loading...</div>;
  return (
    <>
      {/* <div className="problem-desc">
      <h2>{problem.title}</h2>
      <p>{problem.description}</p>
      <h3>Example Test Cases:</h3>
      <ul>
        {problem.testCases.map((testCase, index) => (
          <li key={index}>
            <strong>Input:</strong> {testCase.input} <br />
            <strong>Output:</strong> {testCase.output}
          </li>
        ))}
      </ul>
    </div> */}

<div className="container mx-auto p-6 space-y-8">
      {/* Title Section */}
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-gray-800">{problem.title}</h2>
        <p className="text-lg text-gray-600">{problem.description}</p>
      </div>

      {/* Constraints Section
      <div className="space-y-2">
        <h3 className="text-2xl font-medium text-gray-800">Constraints:</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          {problem.constraints.map((constraint, index) => (
            <li key={index} className="text-sm">{constraint}</li>
          ))}
        </ul>
      </div> */}

      {/* Complexity Section */}
      {/* <div className="space-y-4">
        <h3 className="text-2xl font-medium text-gray-800">Time & Space Complexity:</h3>
        <div className="space-y-2">
          <h4 className="text-xl font-semibold text-gray-800">Time Complexity:</h4>
          <p className="text-lg text-gray-600">{problem.timeComplexity}</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-xl font-semibold text-gray-800">Space Complexity:</h4>
          <p className="text-lg text-gray-600">{problem.spaceComplexity}</p>
        </div>
      </div> */}

      {/* Example Test Cases Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-medium text-gray-800">Example Test Cases:</h3>
        <ul className="space-y-4">
          {problem.testCases.map((testCase, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-md space-y-2">
              <div className="flex justify-between">
                <div className="font-semibold text-gray-800">Input:</div>
                <pre className="bg-gray-200 p-2 rounded-md text-sm text-gray-700">{testCase.input}</pre>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold text-gray-800">Output:</div>
                <pre className="bg-gray-200 p-2 rounded-md text-sm text-gray-700">{testCase.output}</pre>
              </div>
              {testCase.explanation && (
                <div className="text-gray-600">
                  <div className="font-semibold text-gray-800">Explanation:</div>
                  <p>{testCase.explanation}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Code Template Section */}
      {/* <div className="space-y-4">
        <h3 className="text-2xl font-medium text-gray-800">Code Template:</h3>
        <pre className="bg-gray-100 p-4 rounded-lg shadow-md text-sm text-gray-800 whitespace-pre-wrap">
          {problem.codeTemplate}
        </pre>
      </div> */}
    </div>
    </>
  )
}

export default ProblemDesc
