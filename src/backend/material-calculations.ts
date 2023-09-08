export type Grade = {
    name: "desired" | "current"
    qualityNumber: number,
    weight: number,
    elements: MetalElement[]
}

export type MetalElement = {
    name: string,
    percentage: number
}

const mixturesToAdd = (desiredGrade: Grade, currentGrade: Grade) => {
    //Generate list of instructions, if error is found, it is included in list
    const materialAdditions = desiredGrade.elements.map(desiredElement => {
    
        const desiredWeight = (elementalWeight(desiredElement, desiredGrade.weight))
        
        const currElement = currentGrade.elements.find(e => e.name === desiredElement.name)
        
        // If element is not found, then return weigth of desired
        if(!currElement) return {name: desiredElement.name, neededWeight: desiredWeight}

        const currentWeight = elementalWeight(currElement, currentGrade.weight)
        
        const neededWeight = desiredWeight - currentWeight

        // If the weight needed is negative, then the solution contians too much of that element
        if(neededWeight < 0) return {error: `Mixture not possible, solution oversaturated with ${-1 * neededWeight}lbs ${currElement.name}`}

        return {
            name: desiredElement.name,
            neededWeight
        }
    })
    //Checks for elements that are included in current mixture but are not needed in desired
    const unmatchedElements = currentGrade.elements.filter(c => 
        //Checks to see if a grade's name in the current mixture is not found in desired
        !desiredGrade.elements.map(e => e.name).includes(c.name)
    )
    
    //Generate list of errors
    const unmatchedErrors = unmatchedElements.map(unmatched => (
        //Generates error object
        {error: `Current mixture contains ${(unmatched.percentage / 100) * currentGrade.weight}lbs of ${unmatched.name} and is not needed. Solution Invalid`})
    )

    return [...materialAdditions, ...unmatchedErrors]
}


const elementalWeight = ({percentage}: {percentage: number}, weight: number) => {
const result = ((percentage / 100) * weight)
return result
}


export {mixturesToAdd}