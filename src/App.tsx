import { useState } from 'react'
import './App.css'
import ElementTable from './components/ElementTable'
import { currentMixtureDefault, desiredMixtureDefault } from './backend/db'
import { Grade, MetalElement, mixturesToAdd } from './backend/material-calculations'
import OutputTable from './components/OutputTable'


function App() {
  const [currentMixture, setCurrentMixture] = useState<Grade>(currentMixtureDefault())
  const [desiredMixture, setDesiredMixture] = useState<Grade>(desiredMixtureDefault())
  const [output, setOutput] = useState<any>()

  const updateCurrentElement = (newPercentage: number, name: string) => {
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

  const updateDesiredElement = (newPercentage: number, name: string) => {
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

  const addElement = (mixture: "current" | "desired", element: MetalElement) => {
    if(mixture == "current") return setCurrentMixture({...currentMixture, elements: [...currentMixture.elements, element]})
    return setDesiredMixture({...desiredMixture, elements: [...desiredMixture.elements, element]})
  }

  const removeElement = (mixtrure: "current" | "desired", name: string) => {
    if(mixtrure ==  "current") return setCurrentMixture({...currentMixture, elements: currentMixture.elements.filter(e => e.name !== name)})
    return setDesiredMixture({...desiredMixture, elements: desiredMixture.elements.filter(e => e.name !== name)})
  }

  const updatePounds = (mixture: "current" | "desired", weight: number) => {
      if(mixture === "current") {
        setCurrentMixture({
          ...currentMixture,
          weight
        })
      } else{
        setDesiredMixture({
          ...desiredMixture,
          weight
        })
      }
  }

  const runCalculation = () => {
    const result = mixturesToAdd(desiredMixture, currentMixture)
    setOutput(result)
  }
  return (
    <div>
      <h1>Steel Mixture Process</h1>
      <div className='element-container'>
      <ElementTable grade={currentMixture} updatePercentage={updateCurrentElement} updateWeight={updatePounds} addElement={addElement} removeElement={removeElement}/>
      <ElementTable grade={desiredMixture} updatePercentage={updateDesiredElement} updateWeight={updatePounds} addElement={addElement} removeElement={removeElement}/>
      </div>
      <div className='output-container'>
      <button onClick={runCalculation} className='btn btn-primary'>Calculate</button>
      <OutputTable output={output}/>
      </div>
    </div>
  )
}

export default App
