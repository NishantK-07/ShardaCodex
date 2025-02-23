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
      <div className="problem-desc">
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
    </div>
    </>
  )
}

export default ProblemDesc
