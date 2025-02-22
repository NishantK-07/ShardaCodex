import { executeCode } from '@/lib/api';
import React, { useState } from 'react'
import { usecode } from './CodeContext';

// function Output({language,codeRef}) {
  function Output() {
    const {language,codeRef}=usecode();
    const [output,setoutput]=useState(null);
    const runCode=async ()=>{
        const sourcecode=codeRef.current.getValue();
        if(!sourcecode){
            return;
        }
        try {
            const {run:result}=await executeCode(language,sourcecode)
            setoutput(result.output)
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
        <div>
            {output ? output: 'click "Run Code" to see the output here'}
        </div>
      </div>
    </>
  )
}

export default Output
