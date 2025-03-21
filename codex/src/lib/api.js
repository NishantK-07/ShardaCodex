import axios from "axios";
import { language_VERSION } from "@/components/Playground/CodeSnippet";
const API=axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
})

export const executeCode=async (language,sourcecode,input)=>{
    
    console.log("your input is here",input)
    const response=await API.post("/execute",{
        "language": language,
        "version": language_VERSION[language],
        "files": [
            {
            "content": sourcecode
            }
        ],
        "stdin":input
    })
    return response.data
}