import React from 'react'
import Split from 'react-split'
import Codeeditor from './Codeeditor'
import Output from './Output'
import { CodeProvider } from './CodeContext'
function Playground({problemId}) {
  return (
    <CodeProvider>
      <div className='flex flex-col bg-dark h-full'>
        <Split  className="h-[calc(100vh-94px)]" sizes={[75,25]} minSize={60}  direction="vertical">
            <div className='w-full overflow-auto rounded-lg' >
                <Codeeditor problemId={problemId}/>
            </div>
            <div className='rounded-lg'>
                <Output problemId={problemId}/>
            </div>
        </Split>
    </div>
    </CodeProvider>
    
    
  )
}

export default Playground
