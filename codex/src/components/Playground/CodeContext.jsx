// import React ,{useState,useRef,createContext,useContext} from "react";
// const CodeContext = createContext();

// export const usecode=()=>{
//     return useContext(CodeContext)
// }
// export const CodeProvider = ({ children }) => {
   
//     const [language, setLanguage] = useState("javascript");  // State for the  language remeber
//     const codeRef = useRef();  // Ref to hold the editor instance
//     return (
//       <CodeContext.Provider value={{language,setLanguage,codeRef}}>
//         {children}
//       </CodeContext.Provider>
//     );
//   };

// CodeContext.jsx - UPDATED
import React, { useState, useRef, createContext, useContext, useEffect, useCallback } from "react";
import axios from 'axios';

const CodeContext = createContext();

export const usecode = () => {
  return useContext(CodeContext);
};

export const CodeProvider = ({ children }) => {
  const [language, setLanguage] = useState("javascript");
  const codeRef = useRef(); // Ref to hold the editor instance
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const saveTimeoutRef = useRef(null);

  // Auto-save function with debounce
  const saveDraft = useCallback(async (problemId, code, lang) => {
    if (!code || !problemId) return;

    try {
      setIsSaving(true);
      const token = localStorage.getItem('token'); // Assuming you store JWT token here
      
      await axios.post(
        `http://localhost:3010/api/code-drafts/${problemId}/save-draft`,
        { code, language: lang },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Debounced auto-save trigger
  const triggerAutoSave = useCallback((problemId, code, lang) => {
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for auto-save (3 seconds after user stops typing)
    saveTimeoutRef.current = setTimeout(() => {
      saveDraft(problemId, code, lang);
    }, 3000);
  }, [saveDraft]);

  return (
    <CodeContext.Provider 
      value={{
        language, 
        setLanguage, 
        codeRef,
        isSaving,
        lastSaved,
        saveDraft,
        triggerAutoSave
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};