import { useState } from "react"
import { Grade, MetalElement } from "../backend/material-calculations"

interface Props {
    grade: Grade,
    updatePercentage: (newPercentage: number, name: string) => void,
    updateWeight: (mixture: "current" | "desired", weight: number) => void,
    addElement: (mixture: "current" | "desired", element: MetalElement) => void,
    removeElement: (mixture: "current" | "desired", name: string) => void



}

const ElementTable = ({grade, updatePercentage, updateWeight, addElement, removeElement}: Props) => {
  const [newElement, setNewElement] = useState<MetalElement>({name: "", percentage: 0})  
  

  const totalPercentage = grade.elements.map(e => e.percentage).reduce((prev, curr) => prev + curr)

  const handleAddElement = () => {
    if(!(newElement && newElement?.name && newElement.percentage)) return alert("Please enter both a name and percentage for new elements")
    addElement(grade.name, newElement)
    setNewElement({name: "", percentage: 0})
  }

    return (
    <div className="card">
        <div className="card-header">
    {grade.name}: 
    <input 
        value={grade.weight} 
        onChange={(event) => updateWeight(grade.name ,parseFloat(event.target.value))} type="number" className="form-control" placeholder={`${grade.weight}`}/> lbs
  </div>
    <div className="card-body">
        <table className="table">
        <tr>
      <th scope="col">Name</th>
      <th scope="col">Percentage</th>
    </tr>
            <tbody>
                {grade.elements.map(e => (
                <tr>
                    <td>{e.name}</td>
                    <td><input value={e.percentage} onChange={(event) => updatePercentage(parseFloat(event.target.value), e.name)} type="number" className="form-control" placeholder={`${e.percentage}%`}/></td>
                    <td><button onClick={() => removeElement(grade.name, e.name)} className="btn btn-danger">X</button></td>
                </tr>))}
                <tr>
                  <div className="input-group">
                    <input onChange={(e) => setNewElement({...newElement, name: e.target.value})} className="form-control" type="text" placeholder="Name" value={newElement?.name}/>
                  </div>
                    <div className="input-group">
                    <input onChange={(e) => setNewElement({...newElement, percentage: parseInt(e.target.value)})} className="form-control" type="number" placeholder="Percentage %" value={newElement?.percentage}/>%
                    </div>
                    <button onClick={handleAddElement} className="btn btn-secondary">Add Element</button>
                </tr>
            </tbody>
        </table>
        <label>Percentage Allocated: {Math.round(totalPercentage)}/100</label>
    </div>
  </div>)
}

export default ElementTable