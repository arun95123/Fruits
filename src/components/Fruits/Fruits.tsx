import React, { FC, useState } from 'react'

import FruitList from './FruitsList'
import Jar from './Jar'

import { FruitResponse, FruitData } from '../../api/types'
import { type SelectedFruits } from './types'
import './fruits.css'

type Props = {
    fruits: FruitResponse
}

const Fruits: FC<Props> = ({ fruits }) => {
    const [selectedFruits, addFruits] = useState<SelectedFruits>(new Map())

    const selectFruits = (newFruits: FruitData[]) => {
        const duplicateMap = new Map(selectedFruits)
        newFruits.forEach((fruit) => {
            let currentFruit = duplicateMap.get(fruit.id)
            if (currentFruit) {
                duplicateMap.set(fruit.id, {
                    ...currentFruit,
                    quantity: currentFruit.quantity + 1
                })
            } else {
                duplicateMap.set(fruit.id, {
                    name: fruit.name,
                    calroies: fruit.nutritions.calories,
                    quantity: 1
                })
            }
        })
        addFruits(duplicateMap)
    }

    return <div className='fruit-container'>
        <FruitList fruits={fruits} selectFruits={selectFruits} />
        <Jar selectedFruits={selectedFruits} />
    </div>
}

export default Fruits