import React from 'react'
import Split from 'react-split'
import Codeeditor from './Codeeditor'
import ProblemDesc from './ProblemDesc'
import Playground from './Playground'

function ProblemPanel() {
  return (

        <div className='h-screen'>
            <Split className="split-panel h-full" sizes={[45,55]} minSize={60}>
              <ProblemDesc/>
              <Playground/>
            </Split>
        </div>
        

  
  )
}

export default ProblemPanel
