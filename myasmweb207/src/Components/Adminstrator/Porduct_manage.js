import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {useState, useEffect} from 'react';

// import { confirmAlert } from 'react-confirm-alert';

// import Swal from 'sweetalert2/dist/sweetalert2.js';
// import 'sweetalert2/src/sweetalert2.scss';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });



function Product_manage({product, setClickRow, setformData, setproduct,clickRow}) {
    const Swal = require('sweetalert2');
    const classes = useStyles();
    const onClickHanger = (event, value, index) => {
        setClickRow(index);
        setformData(value); // Truyền dữ liệu đẩy lên form
    }
    const Delete = (event,index) => {
        event.stopPropagation();
          Swal.fire({
            title: 'Are you sure you want to delete this record?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: `Confirm`,
            denyButtonText: `Cancel`,
          }).then( async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                //-------------------------
                try {
                    const url = `http://localhost:3040/product/${ product[index].id }`;
                    const response = await axios.delete(url);
                    console.log(response);
                    if (response.status && response.status == 200) {
                        Swal.fire('Deleted!', '', 'success');
                    }
                } catch (error) {
                    console.error(error);
                }
                setproduct(product=[...product.slice(0, index),...product.slice(index+1, product.length)]);

            } 
          })
        setClickRow(clickRow=-1);
    }
    return(
            <div>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="left">NAME</TableCell>
                <TableCell align="left">DESCRIPTION</TableCell>
                <TableCell align="left">PRICE</TableCell>
                <TableCell align="left">QUANTITY</TableCell>
                <TableCell align="left">VISIBLE</TableCell>
                <TableCell align="center">IMAGE</TableCell>
                <TableCell align="center">ACTION</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {product.map((row, index) => (
                    <TableRow key={index} onClick={event => onClickHanger(event, row, index)}> 
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="left"> {row.name}</TableCell>
                        <TableCell align="left" >{row.description}</TableCell>
                        <TableCell align="left" >{row.price}</TableCell>
                        <TableCell align="left" >{row.quantity}</TableCell>
                        <TableCell align="left" >{(row.status)?"TRUE":"FALSE"}</TableCell>
                        <TableCell align="center" ><center><img src={row.image} className="h-16"/></center></TableCell>
                        <TableCell align="center">
                            <Button variant="contained" color="secondary" onClick={event => Delete(event, index)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
}
export default Product_manage;