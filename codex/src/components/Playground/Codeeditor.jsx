"use client";
import React from "react";
import { useState,useRef,useEffect } from "react";
import MonacoEditor from '@monaco-editor/react'
import { Codesnippet } from "../Playground/CodeSnippet";
import Output from "../Playground/Output";
import { usecode } from "./CodeContext";


function Codeeditor() {
  const [editor, setEditor] = useState(null);
  // const [language, setLanguage] = useState("javascript"); // State to track selected language
  const [codelang,setCodelang]=useState("// Write your Javascript code here")

  // const codeRef=useRef();

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

   // Dynamic defaultValue based on language
  //  const getDefaultValue = (language) => {
  //   switch (language) {
  //     case "javascript":
  //       return "// Write your JavaScript code here";
  //     case "python":
  //       return "# Write your Python code here";
  //     case "java":
  //       return "// Write your Java code here";
  //     case "cpp":
  //       return "// Write your C++ code here";
  //     case "html":
  //       return "<!-- Write your HTML code here -->";
  //     case "css":
  //       return "/* Write your CSS code here */";
  //     default:
  //       return "// Write your code here";
  //   }
  // };
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
          <MonacoEditor
          height="100%"
          // defaultLanguage="javascript"
          language={language}
          // defaultValue=" //write your code here in "
          // defaultValue={getDefaultValue(language)} 
          value={codelang}
          onMount={handleEditorMount}
          theme="vs-dark"
          />
        
      </div>

      {/* <Output language={language} codeRef={codeRef}></Output> */}
    {/* </div> */}
    </>
    
  )
}

export default Codeeditor
