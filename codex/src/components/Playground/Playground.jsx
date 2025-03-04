import React from 'react'
import Split from 'react-split'
import Codeeditor from './Codeeditor'
import Output from './Output'
import { CodeProvider } from './CodeContext'
function Playground({problemId}) {
  return (
    <CodeProvider>
      <div className='flex flex-col bg-dark'>
        <Split  className="h-[calc(100vh-94px)]" sizes={[60,40]} minSize={60}  direction="vertical">
            <div className='w-full overflow-auto'>
                <Codeeditor problemId={problemId}/>
            </div>
            <div>
                <Output problemId={problemId}/>
            </div>
        </Split>
    </div>
    </CodeProvider>
    
    
  )
}

export default Playground
