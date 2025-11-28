// "use client";
// import React from "react";
// import { useState,useRef,useEffect } from "react";
// import MonacoEditor from '@monaco-editor/react'
// import { Codesnippet } from "../Playground/CodeSnippet";
// import { usecode } from "./CodeContext";


// function Codeeditor({problemId}) {
//   const [editor, setEditor] = useState(null);
//   const [codelang,setCodelang]=useState("// Write your Javascript code here")
//   // yha pe ab sab context api se lelo
//   const {language,setLanguage,codeRef}=usecode();

//   const handleEditorMount = (editor, monaco) => {
//     codeRef.current=editor
//     editor.focus();
//     setEditor(editor);
//   };
//   const handleLanguageChange = (event) => {
//     const selectedlanguage=event.target.value;
//     setLanguage(selectedlanguage);
//     setCodelang(Codesnippet[selectedlanguage])
//   };


//   return (

//     <>
//     {/* <div className=" flex "> */}
      
//       <div style={{ height: '100%', display: 'flex', flexDirection: 'column',minHeight: '200px'  }} >

//       <div className="bg-white">
//           {/* Language selection dropdown */}
//           <select className="bg-white text-black text-sm p-2 rounded-md border  focus:outline-none w-32"
//            value={language} onChange={handleLanguageChange}>
//           <option value="javascript">JavaScript</option>
//           <option value="python">Python</option>
//           <option value="java">Java</option>
//           <option value="cpp">C++</option>
//           <option value="html">HTML</option>
//           <option value="css">CSS</option>
//           {/* You can add more languages here */}
//           </select>
//       </div>
          

//           <MonacoEditor height="100vh"
//             // defaultLanguage="javascript"
//             language={language}
//             // defaultValue=" //write your code here in "
//             // defaultValue={getDefaultValue(language)} 
//             value={codelang}
//             onMount={handleEditorMount}
//             theme="vs-light"
//           />
        
//       </div>
   
//     </>
    
//   )
// }

// export default Codeeditor

// Codeeditor.jsx - UPDATED
"use client";
import React from "react";
import { useState, useEffect } from "react";
import MonacoEditor from '@monaco-editor/react';
import { Codesnippet } from "../Playground/CodeSnippet";
import { usecode } from "./CodeContext";
import axios from 'axios';

function Codeeditor({ problemId }) {
  const [editor, setEditor] = useState(null);
  const [codelang, setCodelang] = useState("// Write your Javascript code here");
  const [isLoadingDraft, setIsLoadingDraft] = useState(true);
  
  const { language, setLanguage, codeRef, isSaving, lastSaved, triggerAutoSave } = usecode();

  // Load saved draft when component mounts or language changes
  useEffect(() => {
    const loadDraft = async () => {
      try {
        setIsLoadingDraft(true);
        const token = localStorage.getItem('token');
        
        const response = await axios.get(
          `http://localhost:3010/api/code-drafts/${problemId}/draft?language=${language}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (response.data.code) {
          setCodelang(response.data.code);
        } else {
          // No saved draft, use default snippet
          setCodelang(Codesnippet[language]);
        }
      } catch (error) {
        // No draft found, use default
        setCodelang(Codesnippet[language]);
      } finally {
        setIsLoadingDraft(false);
      }
    };

    if (problemId) {
      loadDraft();
    }
  }, [problemId, language]);

  const handleEditorMount = (editor, monaco) => {
    codeRef.current = editor;
    editor.focus();
    setEditor(editor);

    // Listen to code changes for auto-save
    editor.onDidChangeModelContent(() => {
      const code = editor.getValue();
      triggerAutoSave(problemId, code, language);
    });
  };

  const handleLanguageChange = (event) => {
    const selectedlanguage = event.target.value;
    setLanguage(selectedlanguage);
    // Draft will be loaded by useEffect
  };

  // Format last saved time
  const formatLastSaved = () => {
    if (!lastSaved) return '';
    const now = new Date();
    const diff = Math.floor((now - lastSaved) / 1000); // seconds
    
    if (diff < 60) return 'Saved just now';
    if (diff < 3600) return `Saved ${Math.floor(diff / 60)} min ago`;
    return `Saved at ${lastSaved.toLocaleTimeString()}`;
  };

  if (isLoadingDraft) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">Loading your code...</p>
      </div>
    );
  }

  return (
    <>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: '200px' }}>
        <div className="bg-white flex items-center justify-between px-2 py-2 border-b">
          {/* Language selection dropdown */}
          <select
            className="bg-white text-black text-sm p-2 rounded-md border focus:outline-none w-32"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>

          {/* Auto-save indicator */}
          <div className="text-xs text-gray-500 flex items-center gap-2">
            {isSaving ? (
              <>
                <span className="animate-pulse">●</span>
                <span>Saving...</span>
              </>
            ) : lastSaved ? (
              <>
                <span className="text-green-500">✓</span>
                <span>{formatLastSaved()}</span>
              </>
            ) : null}
          </div>
        </div>

        <MonacoEditor
          height="100vh"
          language={language}
          value={codelang}
          onMount={handleEditorMount}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </>
  );
}

export default Codeeditor;