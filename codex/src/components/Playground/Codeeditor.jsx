"use client";
import React from "react";
import { useState,useRef,useEffect } from "react";
import MonacoEditor from '@monaco-editor/react'
import { Codesnippet } from "../Playground/CodeSnippet";
import { usecode } from "./CodeContext";


function Codeeditor({problemId}) {
  const [editor, setEditor] = useState(null);
  const [codelang,setCodelang]=useState("// Write your Javascript code here")
  // yha pe ab sab context api se lelo
  const {language,setLanguage,codeRef}=usecode();

  const handleEditorMount = (editor, monaco) => {
    codeRef.current=editor
    editor.focus();
    setEditor(editor);
  };
  const handleLanguageChange = (event) => {
    const selectedlanguage=event.target.value;
    setLanguage(selectedlanguage);
    setCodelang(Codesnippet[selectedlanguage])
  };


  return (

    <>
    {/* <div className=" flex "> */}
      
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column',minHeight: '200px'  }} >

      <div className="bg-white">
          {/* Language selection dropdown */}
          <select className="bg-white text-black text-sm p-2 rounded-md border  focus:outline-none w-32"
           value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          {/* You can add more languages here */}
          </select>
      </div>
          

          <MonacoEditor height="100vh"
            // defaultLanguage="javascript"
            language={language}
            // defaultValue=" //write your code here in "
            // defaultValue={getDefaultValue(language)} 
            value={codelang}
            onMount={handleEditorMount}
            theme="vs-light"
          />
        
      </div>
   
    </>
    
  )
}

export default Codeeditor
