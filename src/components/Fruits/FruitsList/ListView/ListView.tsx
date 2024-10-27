import React, { FC, ReactNode } from 'react'

import ListItem from './ListItem.tsx';

import { FruitData, FruitResponse } from '../../../../api/types'
import { Group } from '../../types.js';
import './list-view.css'

type Prop = {
    fruits: FruitResponse
    selectFruits: Function
    group: Group
}


type GroupedValue = {
    calories: number
    children: FruitData[]
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
            const groupedValues = new Map<string, GroupedValue>()
            fruits.forEach((fruit) => {
                let currentGroup = groupedValues.get(fruit[group])
                if (currentGroup) {
                    groupedValues.set(fruit[group], {
                        calories: currentGroup.calories + fruit.nutritions.calories,
                        children: [...currentGroup.children, fruit]
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