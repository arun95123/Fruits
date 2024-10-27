import React, { FC } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

import { FruitResponse } from '../../../../api/types';

type Props = {
    fruits: FruitResponse
    selectFruits: Function
}

const TableView: FC<Props> = ({ fruits, selectFruits }) => {
    return (
        <div className='fruit-list--table-item'>
            <TableContainer component={Paper}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Family</TableCell>
                            <TableCell align="right">Order</TableCell>
                            <TableCell align="right">Genus(g)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fruits.map((fruit) => (
                            <TableRow
                                key={fruit.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {fruit.name}
                                    <IconButton size='large' onClick={() => selectFruits([fruit])}>
                                        <AddCircleTwoToneIcon htmlColor='green' />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">{fruit.family}</TableCell>
                                <TableCell align="right">{fruit.order}</TableCell>
                                <TableCell align="right">{fruit.genus}</TableCell>
                                <TableCell align="right">{fruit.nutritions.calories}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TableView