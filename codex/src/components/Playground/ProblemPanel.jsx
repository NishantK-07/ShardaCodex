import React from 'react'
import Split from 'react-split'
import Codeeditor from './Codeeditor'
import ProblemDesc from './ProblemDesc'
import Playground from './Playground'

function ProblemPanel() {
  const problemId = '67badbd6bfb9789a740c30a6';
  return (

        <div className='h-screen'>
            <Split className="split-panel h-full" sizes={[45,55]} minSize={60}>
              <ProblemDesc problemId={problemId}/>
              <Playground problemId={problemId}/>
            </Split>
        </div>
        

  
  )
}

export default ProblemPanel
