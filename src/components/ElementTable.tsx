import { Grade } from "../backend/material-calculations"

interface Props {
    grade: Grade,
    updatePercentage: (newPercentage: number, name: string) => void;
}

const ElementTable = ({grade, updatePercentage}: Props) => {
    const totalPercentage = grade.elements.map(e => e.percentage).reduce((prev, curr) => prev + curr)

    return (
    <div className="card">
        <div className="card-header">
    {grade.name}: {grade.weight} lbs
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
                </tr>))}
            </tbody>
        </table>
        <label>Percentage Allocated: {Math.round(totalPercentage)}/100</label>
    </div>
  </div>)
}

export default ElementTable