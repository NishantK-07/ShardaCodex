import React ,{useState,useRef,createContext,useContext} from "react";
const CodeContext = createContext();

export const usecode=()=>{
    return useContext(CodeContext)
}
export const CodeProvider = ({ children }) => {
   
    const [language, setLanguage] = useState("javascript");  // State for the  language remeber
    const codeRef = useRef();  // Ref to hold the editor instance
    return (
      <CodeContext.Provider value={{language,setLanguage,codeRef}}>
        {children}
      </CodeContext.Provider>
    );
  };