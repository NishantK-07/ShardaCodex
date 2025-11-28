// import axios from "axios";
// import { language_VERSION } from "@/components/Playground/CodeSnippet";
// const API=axios.create({
//     baseURL: "https://emkc.org/api/v2/piston",
//     timeout: 10000,
// })
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3010/api",
  withCredentials: true, // important: cookies/session
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
// export const executeCode=async (language,sourcecode,input)=>{
    
//     console.log("your input is here",input)
//     const response=await API.post("/execute",{
//         "language": language,
//         "version": language_VERSION[language],
//         "files": [
//             {
//             "content": sourcecode
//             }
//         ],
//         "stdin":input
//     })
//     return response.data
// // }
// async function executeCode(code, language, input = "") {
//   try {
//     console.log(`Executing ${language} code with input:`, input);

//     // Call Piston API - same structure as frontend
//     const response = await API.post("/execute", {
//       language: language,
//       version: language_VERSION[language],
//       files: [
//         {
//           content: code,
//         },
//       ],
//       stdin: input,
//     });

//     const data = response.data;
//     console.log("Piston API response:", data);

//     // Check for compilation errors
//     if (data.compile && data.compile.stderr) {
//       return {
//         output: '',
//         error: data.compile.stderr,
//         timeout: false,
//         executionTime: 0,
//         memoryUsed: 0,
//       };
//     }

//     // Check for timeout signals
//     const isTimeout = data.run.signal === 'SIGKILL' || data.run.signal === 'SIGTERM';

//     // Check for runtime errors
//     const hasError = data.run.stderr && data.run.stderr.trim().length > 0;

//     // Return structured result
//     return {
//       output: data.run.output || data.run.stdout || '',
//       error: hasError ? data.run.stderr : null,
//       timeout: isTimeout,
//       executionTime: Math.floor((data.run.time || 0) * 1000), // Convert seconds to milliseconds
//       memoryUsed: 0, // Piston doesn't provide memory usage
//     };

//   } catch (error) {
//     console.error("Code execution error:", error.message);

//     // Handle API errors
//     if (error.response) {
//       // Piston API returned an error
//       return {
//         output: '',
//         error: error.response.data?.message || 'Execution failed',
//         timeout: false,
//         executionTime: 0,
//         memoryUsed: 0,
//       };
//     } else if (error.request) {
//       // Request was made but no response
//       return {
//         output: '',
//         error: 'Execution service unavailable',
//         timeout: true,
//         executionTime: 0,
//         memoryUsed: 0,
//       };
//     } else {
//       // Something else went wrong
//       return {
//         output: '',
//         error: error.message || 'Unknown execution error',
//         timeout: false,
//         executionTime: 0,
//         memoryUsed: 0,
//       };
//     }
//   }
// }

// module.exports = { executeCode };