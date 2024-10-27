import React, { FC, ReactNode, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';

import './list-item.css'

type Props = {
    name: string
    calories: number
    showAdd: boolean
    addOnClick?: Function
    children?: ReactNode
}

const ListItem: FC<Props> = ({ children, name, calories, showAdd, addOnClick = () => { } }) => {
    const [showAccordian, setAccordian] = useState(false)
    const accordianClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (children) {
            setAccordian((prev) => !prev)
        }
    }

    return <div className='list-items'>
        <div className='list-item--header' onClick={(e) => accordianClick(e)}>
            <div>{name}</div>
            <div>Calroies: {calories}</div>
            <div className='list-item--controls'>
                {
                    showAdd ?
                        <IconButton size='large' onClick={(e) => {
                            e.stopPropagation()
                            addOnClick()
                        }}>
                            <AddCircleTwoToneIcon htmlColor='green' />
                        </IconButton> : <></>
                }
                {
                    children ? <ArrowDropDownTwoToneIcon />
                        : <></>
                }
            </div>
        </div>
        {
            showAccordian ?
                <div className='list-item--child'>
                    {children}
                </div> : <></>
        }
    </div >

}

export default ListItem