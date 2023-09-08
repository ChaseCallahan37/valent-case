import { Grade } from "./material-calculations"

const desiredMixtureDefault = (): Grade => ({
    name: "desired",
    qualityNumber: 316.55,
    weight: 2000,
    elements: [
        {
            name: "Chromium",
            percentage: 15.00
        },
        {
            name: "Nickel",
            percentage:14.00
        },
        {
            name: "Molybdenum",
            percentage: 2.5
        },
        {
            name: "Carbon",
            percentage: .08,
        }, {
            name: "Manganeses",
            percentage: 2.00
        }, {
            name: "Phosphorus",
            percentage: .05
        },
        {
            name: "Sulfur",
            percentage: .03
        },
        {
            name: "Silicon",
            percentage: .75,
        },
        {
            name: "Nitrogen",
            percentage: .1,
        } ,
        {
            name: "Iron",
            percentage: 65.49
        }
    ]
})

const currentMixtureDefault = (): Grade => ({
name: "current",
qualityNumber: 316.55,
weight: 1000,
elements: [
    {
        name: "Chromium",
        percentage: 20.00
    },
    {
        name: "Nickel",
        percentage: 9.00
    },
    {
        name: "Molybdenum",
        percentage: 2.5
    },
    {
        name: "Carbon",
        percentage: .08,
    }, {
        name: "Manganeses",
        percentage: 2.00
    }, {
        name: "Phosphorus",
        percentage: .05
    },
    {
        name: "Sulfur",
        percentage: .03
    },
    {
        name: "Silicon",
        percentage: .75,
    },
    {
        name: "Nitrogen",
        percentage: .1,
    } ,
    {
        name: "Iron",
        percentage: 65.49
    }
]
})

export {currentMixtureDefault, desiredMixtureDefault}