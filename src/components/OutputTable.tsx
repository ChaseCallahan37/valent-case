interface Props {
    output: any[]
}

const OutputTable = ({output}: Props) => {
    if(!output || output.length < 0) return null

    if(!output.every(item => !item.error)) return <div className="error-output">
        {output.filter(e => e.error).map(e => <p>{e.error}</p>)}
    </div>
   
    console.log(output)

    return <table className="table">
    <thead>
      <tr>
        <th scope="col">Element</th>
        <th scope="col">Weight To Add</th>
      </tr>
    </thead>
    <tbody>
      {output.map(e => 
                <tr>
                    <td>{e.name}</td>
                    <td>{`${e.neededWeight.toFixed(2)} lbs`}</td>
                </tr>)}
     
    </tbody>
  </table>
}

export default OutputTable