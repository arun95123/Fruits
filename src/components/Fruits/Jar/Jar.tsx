import React, { FC, ReactNode, useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';

import './jar.css'
import { type SelectedFruits } from '../types';

type Props = {
    // selectedFruits: FruitData[]
    selectedFruits: SelectedFruits
}

type ChartData = {
    id: number,
    label: string,
    value: number
}[]

const Jar: FC<Props> = ({ selectedFruits }) => {
    // const totalCalories = selectedFruits.reduce((sum, fruit) => sum + fruit.nutritions.calories, 0)
    let charData: ChartData = []
    // selectedFruits.forEach((fruit) => {
    //     {
    //         id: fruit.id
    //         value: fruit.nutritions.calories,
    //         label: fruit.name
    //     }

    // })
    let ListItem: ReactNode[] = []
    let totalCalories = 0;
    selectedFruits.forEach((fruit, id) => {
        totalCalories += fruit.calroies * fruit.quantity
        charData.push({
            id,
            value: totalCalories,
            label: fruit.name
        })
        ListItem.push(
            <div>
                {fruit.name} - {fruit.quantity}
            </div>
        )
    })

    return <div className='jar-container'>
        <div className='jar-container--info'>
            <div>
                <div className='jar-contianer--calroies'>{totalCalories}</div>
                <h5>Total calories</h5>
            </div>
            <PieChart
                series={[
                    {
                        data: charData
                    },
                ]}
                margin={{ top: 10, bottom: 50, left: 10, right: 10 }}
                width={400}
                height={200}
                slotProps={{
                    legend: {
                        labelStyle: {
                            fontSize: 12,
                        },
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: 0,
                        itemMarkWidth: 10,
                        itemMarkHeight: 10,
                    },
                }}
            />
        </div>
        <h3>Fruits in the Jar</h3>
        <div className='jar-continer--list'>
            {ListItem}
        </div>
    </div >
}

export default Jar