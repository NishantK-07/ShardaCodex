"use client";
import React from "react";
import { useState,useRef,useEffect } from "react";
import MonacoEditor from '@monaco-editor/react'
import { Codesnippet } from "../Playground/CodeSnippet";
import Output from "../Playground/Output";
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
  // const handleSave = () => {
  //   if (editor) {
  //     const code = editor.getValue();
  //     console.log('Saved code:', code);
  //   }
  // };
  // to change language
  const handleLanguageChange = (event) => {
    const selectedlanguage=event.target.value;
    setLanguage(event.target.value);

    // const newcodelang=getDefaultValue(selectedlanguage)
    // setCodelang(newcodelang)
    setCodelang(Codesnippet[selectedlanguage])
  };


  return (

    <>
    {/* <div className=" flex "> */}
      
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column',minHeight: '200px'  }} >

          {/* Language selection dropdown */}
          <select className="bg-gray-600 text-white" value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          {/* You can add more languages here */}
          </select>

          <MonacoEditor height="100%"
            // defaultLanguage="javascript"
            language={language}
            // defaultValue=" //write your code here in "
            // defaultValue={getDefaultValue(language)} 
            value={codelang}
            onMount={handleEditorMount}
            theme="vs-dark"
          />
        
      </div>
      <Output problemId={problemId}/>
      {/* <Output language={language} codeRef={codeRef}></Output> */}
    {/* </div> */}
    </>
    
  )
}

export default Codeeditor
