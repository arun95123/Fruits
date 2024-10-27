import React, { FC, useState } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import TableView from './TableView';
import ListView from './ListView';

import { FruitResponse } from '../../../api/types'
import './fruit-list.css'

//TODO: Move to context api
type Props = {
    fruits: FruitResponse
    selectFruits: Function
}

const FruitList: FC<Props> = ({ fruits, selectFruits }) => {
    const [group, setGroup] = useState<'family' | 'order' | 'genus' | ''>('');
    const [showTable, setTableView] = useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        //TODO: revist type
        setGroup(event.target.value as 'family' | 'order' | 'genus' | '');
    };

    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTableView(event.target.checked);
    }

    const showGroupBy = () => {
        if (!showTable) {
            return (
                <FormControl sx={{ m: 1, width: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Group By</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={group}
                        onChange={handleChange}
                        label="Group By"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'family'}>Family</MenuItem>
                        <MenuItem value={'order'}>Order</MenuItem>
                        <MenuItem value={'genus'}>Genus</MenuItem>
                    </Select>
                </FormControl>
            )
        } else {
            return <></>
        }
    }

    const showTableToggle = () => (
        <FormControlLabel control={
            <Switch
                checked={showTable}
                onChange={handleToggle}
                inputProps={{ 'aria-label': 'controlled' }}
            />
        } label="Table View" />
    )

    return <div className='fruit-list'>
        <div className='fruit-list--header'>
            <div>Fruit List</div>
            {showGroupBy()}
            {showTableToggle()}
        </div>
        <div>
            {showTable ?
                <TableView fruits={fruits} selectFruits={selectFruits} />
                :
                <ListView fruits={fruits} selectFruits={selectFruits} group={group} />
            }

        </div>
    </div>
}

export default FruitList