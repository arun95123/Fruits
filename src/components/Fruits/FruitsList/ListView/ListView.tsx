import React, { FC, ReactNode } from 'react'

import { FruitData, FruitResponse } from '../../../../api/types'
import './list-view.css'
import ListItem from './ListItem.tsx';

type Prop = {
    fruits: FruitResponse
    selectFruits: Function
    group: 'family' | 'order' | 'genus' | ''
}

const ListView: FC<Prop> = ({ fruits, selectFruits, group }) => {
    const showList = () => {
        if (!group) {
            return listGivenFruits(fruits)
        } else {
            return groupBy()
        }
    }

    const groupBy = () => {
        let elements: ReactNode[] = [];
        if (group) {
            const groupedValues = new Map()
            fruits.forEach((fruit) => {
                if (groupedValues.has(fruit[group])) {
                    let curr = groupedValues.get(fruit[group])
                    curr.children.push(fruit)
                    groupedValues.set(fruit[group], {
                        calories: curr.calories + fruit.nutritions.calories,
                        children: curr.children
                    })
                } else {
                    groupedValues.set(fruit[group], {
                        calories: fruit.nutritions.calories,
                        children: [fruit]
                    })
                }
            })
            groupedValues.forEach((value, name) => {
                elements.push(
                    <ListItem
                        key={name}
                        name={name}
                        calories={value.calories}
                        showAdd
                        addOnClick={() => selectFruits(value.children)}
                    >
                        <div>
                            {value.children.map((fruit: FruitData) => (
                                <ListItem
                                    key={fruit.id}
                                    name={fruit.name}
                                    calories={fruit.nutritions.calories}
                                    showAdd={false}
                                />
                            ))}
                        </div>
                    </ListItem>
                )
            })
        }
        return elements
    }

    const listGivenFruits = (fruitList: FruitData[]) => {
        return fruitList.map((fruit) => (
            <ListItem
                key={fruit.id}
                name={fruit.name}
                calories={fruit.nutritions.calories}
                showAdd
                addOnClick={() => selectFruits([fruit])}
            />
        ))
    }

    return (
        <>
            <div className='list-view'>
                {showList()}
            </div>
        </>

    )
}

export default ListView