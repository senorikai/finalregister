import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Button, Table, TextField } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {positions} from '@material-ui/system'


function Todo(props) {
    const [todoname, setTodoname] = useState({
        users: [],
        todoname: ''
    });

    // useEffect(async () => {
    //     const geh = await axios.post('/viewTodo')
    //     for (var i = 0; i < geh.data.length; i++) {
    //         console.log("test :" + geh.data[i].username)
    //     }
    //     setTodoname({ ...todoname, users: geh.data })
    // }, []);

    const todonameInputChange = (e) => {
        setTodoname({ todoname: e.target.value })
        setTodoname(e.target.value);
        console.log(e.target.value)
    }

    const handleAddButton = () => {

    }

    const handleDeleteButton = () => {

    }

    const handleInsertButton = () => {

    }
}

    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.blue,
          color: theme.palette.common.black,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);

      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);

      function createData(name, calories, fat, carbs, protein) {
          return {name, calories, fat, carbs, protein};
      }

      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];

      const useStyles = makeStyles({
          table: {
              minWidth: 700,
          }
      });

      export default function CustomizedTables() {
        const classes = useStyles();

    return (
        <div class="content">
            {/* {<TextField
                id="todo"
                label="ToDo"
                value={todoname.todoname}
                label="ToDo"
                variant="outlined"
                color="#07ad90"
                onChange={todonameInputChange} */}
            {/* />} */}
            {/* <TextField oChange={todonameInputChange}>sdsd</TextField> */}
            {<Button onClick style={{ backgroundColor: 'skyblue' }}>+</Button>}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
            <TableHead>
               <TableRow>
               <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                <StyledTableCell align="right">Calories</StyledTableCell>
                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
               </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                               <StyledTableRow key={row.name}>
                               <StyledTableCell component="th" scope="row">
                                 {row.name}
                               </StyledTableCell>
                               <StyledTableCell align="right">{row.calories}</StyledTableCell>
                               <StyledTableCell align="right">{row.fat}</StyledTableCell>
                               <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                               <StyledTableCell align="right">{row.protein}</StyledTableCell>
                             </StyledTableRow>
                ))}
            </TableBody>
            </Table>
            </TableContainer>
            {<Button onClick style={{ backgroundColor: 'red' }}>Delete</Button>}
            {<Button onClick style={{ backgroundColor: 'blue'}}>Edit</Button>}

            {/* <table>

                <thead> */}
                    {/* <th>
                                Email
                  </th>
                            <th>
                                Username
                  </th>
                            <th>ACTIONS</th> */}
                    {/* <th>
                                <Button onClick style={{ backgroundColor: 'greenyellow' }}>+</Button>
                            </th> */}
                {/* </thead>
                <tbody>
                    {console.log(`testing`, todoname.users)}
                    {todoname.users ? (todoname.users.map((data) => {
                        return ( */}
                    {/* //         <tr> */}
                    {/* //             <td style={{ border: '1px solid #ddd', borderColor: 'black' }}> */}
                    {/* //                 {data.email}asdads
                    //     </td> */}
                    {/* //             <td style={{ border: '1px solid #ddd', borderColor: 'black' }}>
                    //                 {data.username}
                    //             </td>
                    //             <td>
                    //                 <Button style={{ backgroundColor: 'red' }} >Delete</Button> */}
                    {/* //                 <Button style={{ backgroundColor: 'green' }}>EDIT</Button>
                    //             </td> */}

                    {/* //         </tr> */}
                    {/* //     )
                    // })) : <div>Error</div>} */}
                {/* </tbody>
            </table> */}


        </div>
    );


    // useEffect(async () => {
    //     const geh = await axios.post('/viewTodo')
    //     for (var i = 0; i < geh.data.length; i++) {
    //         console.log("test :" + geh.data[i].username)
    //     }
    //     setTodoname({ ...todoname, users: geh.data })
    // }, []);

    // const handleViewTodo = async () => {
    //     const geh = await axios.post('/viewTodo')
    //     for(var i = 0; i < geh.data.length; i++){
    //         console.log("test :"+geh.data[i].username)
    //     }
    //     setTodoname({...todoname, users: geh.data})
    // }

    // return (
    //     <div class="content">
    //         {/* <h2>Todo</h2> */}
    //         <div onsubmit="event.preventDefault()">
    //             <div class="field-wrapper">
    //                 <input type="text" name="Todo" value={todoname.todoname} onChange={todonameInputChange} placeholder="ToDo" autoComplete="off" />
    //                 <label>ToDo</label>
    //                 {/* <button onClick = {handleViewTodo} >aasa</button> */}
    //                 {/* <Button style={{ backgroundColor: 'greenyellow'}}>+</Button> */}
    //                 {/* <Button style={{ backgroundColor: 'greenyellow'}}>LOGOUT</Button> */}
    //                 <table>

    //                     <thead>
    //                         <th>
    //                             Email
    //               </th>
    //                         <th>
    //                             Username
    //               </th>
    //               <th>ACTIONS</th>
    //               <th>
    //               <Button style={{ backgroundColor: 'greenyellow'}}>+</Button>
    //               </th>
    //                     </thead>
    //                     <tbody>
    //                         {console.log(`testing`, todoname.users)}
    //                         {todoname.users ? (todoname.users.map((data) => {
    //                             return (
    //                                 <tr>
    //                                     <td style={{ border: '1px solid #ddd', borderColor: 'black' }}>
    //                                         {data.email}asdads
    //                     </td>
    //                                     <td style={{ border: '1px solid #ddd', borderColor: 'black' }}>
    //                                         {data.username}
    //                                     </td>
    //                                     <td>
    //                                     <Button onClick={} style={{ backgroundColor: 'red'}} >Delete</Button>
    //                                     <Button style={{ backgroundColor: 'green'}}>EDIT</Button>
    //                                     </td>

    //                                 </tr>
    //                             )
    //                         })) : <div>Error</div>}
    //                     </tbody>
    //                 </table>


    //             </div>
    //         </div>
    //     </div>
    // )
}

// export default Todo