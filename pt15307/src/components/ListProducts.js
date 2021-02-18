// import {useState} from 'react';
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
// import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// import Swal from 'sweetalert2/dist/sweetalert2.js';
// import 'sweetalert2/src/sweetalert2.scss'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

function Phones({product, setClickRow, setformData, setproduct,clickRow}) {
    const Swal = require('sweetalert2');
    const classes = useStyles();
    const onClickHanger = (event, value, index) => {
        setClickRow(index);
        setformData(value); // Truyền dữ liệu đẩy lên form
    }
     const Delete = (event,index) => {
        event.stopPropagation();
        // -----------confirm----------------
        // confirmAlert({
        //     title: 'Confirm to submit',
        //     message: 'Are you sure to do this.',
        //     buttons: [
        //       {
        //         label: 'Yes',
        //         onClick: async () => {
        //             // hành động khi ấn Y
        //             try {
        //                 const url = `https://600e390d3bb1d100179de8b4.mockapi.io/products/product/${ product[index].id }`;
        //                 const response = await axios.delete(url);
        //                 console.log(response)
        //                 if (response.status && response.status == 200) {
        //                     Swal.fire('Xóa thành công');
        //                 }
        //             } catch (error) {
        //                 console.error(error)
        //             }
        //             setproduct(product=[...product.slice(0, index),...product.slice(index+1, product.length)]);
        //         }
        //       },
        //       {
        //         label: 'No',
        //         onClick: () => {
        //             // hành động khi ấn N
        //         }
        //       }
        //     ]
        //   });
          // ------------------------------------------------------------------
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
                    const url = `https://600e390d3bb1d100179de8b4.mockapi.io/products/product/${ product[index].id }`;
                    const response = await axios.delete(url);
                    console.log(response)
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
                <TableCell>ID</TableCell>
                <TableCell align="right">NAME</TableCell>
                <TableCell align="right">PRICE</TableCell>
                <TableCell align="right">ACTION</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {product.map((row, index) => (
                    <TableRow key={index} onClick={event => onClickHanger(event, row, index)}> 
                        <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell align="right">
                        {row.name}
                    </TableCell>
                    <TableCell align="right" >{row.price}</TableCell>
                    <TableCell align="right">
                        <Button variant="contained" color="secondary" onClick={event => Delete(event, index)} >Delete</Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
}
export default Phones;