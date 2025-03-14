import React from 'react'
import Split from 'react-split'
import Codeeditor from './Codeeditor'
import ProblemDesc from './ProblemDesc'
import Playground from './Playground'

function ProblemPanel() {
  const problemId = '67badbd6bfb9789a740c30a6';
  return (

        <div className="h-screen bg-gr bg-gray-100 pt-12 px-4 pb-4">
            <Split className="split-panel h-full" sizes={[45,55]} minSize={60}>
              <div className=" bg-white shadow-md rounded-lg ">
                <ProblemDesc problemId={problemId}/>

              </div>
              <div className="">
                <Playground problemId={problemId}/>

              </div>
            </Split>
        </div>
        

  
  )
}

export default ProblemPanel
