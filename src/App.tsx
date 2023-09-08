import { useState } from 'react'
import './App.css'
import ElementTable from './components/ElementTable'
import { currentMixtureDefault, desiredMixtureDefault } from './backend/db'
import { Grade, MetalElement, mixturesToAdd } from './backend/material-calculations'
import OutputTable from './components/OutputTable'


function App() {
  const [currentMixture, setCurrentMixture] = useState(currentMixtureDefault())
  const [desiredMixture, setDesiredMixture] = useState(desiredMixtureDefault())
  const [output, setOutput] = useState<any>()

  const updateCurrent = (newPercentage: number, name: string) => {
    const newElements: MetalElement[] = currentMixture.elements.map(element => {
      if(element.name === name) return {name, percentage: newPercentage}
      return element
    })
    setCurrentMixture({
      elements: newElements,
      name: currentMixture.name,
      qualityNumber: currentMixture.qualityNumber,
      weight: currentMixture.weight
    })

    
  }

  const updateDesired = (newPercentage: number, name: string) => {
    const newElements: MetalElement[] = desiredMixture.elements.map(element => {
      if(element.name === name) return {name, percentage: newPercentage}
      return element
    })
    setDesiredMixture({
      elements: newElements,
      name: desiredMixture.name,
      qualityNumber: desiredMixture.qualityNumber,
      weight: desiredMixture.weight
    })

    
  }

  const runCalculation = () => {
    const result = mixturesToAdd(desiredMixture, currentMixture)
    setOutput(result)
  }
  return (
    <div>
      <h1>Steel Mixture Process</h1>
      <div className='element-container'>
      <ElementTable grade={currentMixture} updatePercentage={updateCurrent}/>
      <ElementTable grade={desiredMixture} updatePercentage={updateDesired}/>
      </div>
      <div className='output-container'>
      <button onClick={runCalculation} className='btn btn-primary'>Calculate</button>
      <OutputTable output={output}/>
      </div>
    </div>
  )
}

export default App
