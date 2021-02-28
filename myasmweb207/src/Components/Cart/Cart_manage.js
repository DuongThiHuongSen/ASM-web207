import Table from '@material-ui/core/Table';
import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';
// import Input from '@material-ui/core/Input';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import {useState, useEffect} from 'react';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  

function Cart_manage({cart, setcart, product, order, setorder }) {
    var today = new Date();
    var curentdate = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    const Swal = require('sweetalert2');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const classes = useStyles();
    
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
                    const url = `http://localhost:3040/cart/${ cart[index].id }`;
                    const response = await axios.delete(url);
                    console.log(response);
                    if (response.status && response.status === 200) {
                        Swal.fire('Deleted!', '', 'success');
                    }
                } catch (error) {
                    console.error(error);
                }
                setcart(cart=[...cart.slice(0, index),...cart.slice(index+1, cart.length)]);
            } 
          })
        // setClickRow(clickRow=-1);
    }

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    
    const foundProductByID = (product, id) => {
        return product.find(x => x.id == id);
    }
    const addAmount = (index) => {
        // console.log(cart[index].amount+1);
        const curentRow = cart[index];
        setcart(cart=[...cart.slice(0, index),{...curentRow,amount:cart[index].amount+1}, ...cart.slice(index+1, cart.length)]);
    }
    const MinusAmount = (index) => {
        // console.log(cart[index].amount-1);
        if(cart[index].amount-1 > 0){
            const curentRow = cart[index];
            setcart(cart=[...cart.slice(0, index),{...curentRow,amount:cart[index].amount-1}, ...cart.slice(index+1, cart.length)]);
        }
    }
    let TongTien = 0;
    
    const pushOrder = async (dataPush) => {
        try {
            const response = await axios({
                method:'POST',
                url: "http://localhost:3040/order",
                data: dataPush,
            });
            if(response.status && response.status == 201){
                console.log(response);
                setorder(order=[...order, response.data]); 
            }
        } catch (error) {
            console.error(error)
        }
    }

    const deleteCart = async (id) => {
        try {
            const url = `http://localhost:3040/cart/${ id }`;
            const response = await axios.delete(url);
            console.log(response);
            if (response.status && response.status === 200) {
                console.log("delete xong id = "+ id);
            }
        } catch (error) {
            console.error(error);
        }
    }

   
    const BUY = (event) => {
        Swal.fire({
            title: `Are you sure you want to pay ${TongTien} for all products?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: `Confirm`,
            denyButtonText: `Cancel`,
          }).then( (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) { // nếu đồng ý mua
                //--------------Thêm vào Order -----------------
                // const maxID = Math.max.apply(Math, order.map(x => x.id));
                cart.forEach(bill => {
                    pushOrder({
                        id: '',
                        pro_id: bill.id,
                        total: bill.amount,
                        date: curentdate,
                        total_money: foundProductByID(product,bill.id).price*bill.amount
                    });
                    deleteCart(bill.id);
                });
                Swal.fire('Buy!', '', 'success');
                setcart([]);
            } 
          })
    }
    return(
        <div>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                <TableCell align="center">NO.</TableCell>
                <TableCell align="center">PRODUCT</TableCell>
                <TableCell align="center">PRICE</TableCell>
                <TableCell align="center">AMOUNT</TableCell>
                <TableCell align="center">TOTAL MONEY</TableCell>
                <TableCell align="center">ACTION</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {cart
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // const isItemSelected = isSelected(row.id);
                  // const labelId = `enhanced-table-checkbox-${index}`;
                    TongTien+= (foundProductByID(product,row.id))?foundProductByID(product,row.id).price*row.amount : 0;
                  return (
                    <TableRow key={index} > 
                        <TableCell align="center">{page * rowsPerPage + index +1}</TableCell>
                        {/* <TableCell align="center">{row.id}</TableCell> */}
                        <TableCell align="center"> 
                            <div>
                                <center><img className="w-20" src={(foundProductByID(product,row.id))?foundProductByID(product,row.id).image : ""}/></center>
                                {(foundProductByID(product,row.id))?foundProductByID(product,row.id).name : "Sản Phẩm không tồn tại"}
                            </div>
                        </TableCell>
                        <TableCell align="center">{(foundProductByID(product,row.id))?foundProductByID(product,row.id).price*1 : "0"}</TableCell>
                        <TableCell align="center" >
                            <Button startIcon={<RemoveIcon/>} color="secondary" onClick = { event => MinusAmount(index)}/>
                            <p className="inline-block p-2">{row.amount}</p>
                            <Button color="secondary" startIcon={<AddIcon/>} onClick={ event => addAmount(index) }/>
                        </TableCell>
                        <TableCell align="center">
                            {(foundProductByID(product,row.id))
                            ?(foundProductByID(product,row.id).price*row.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                            : "0"}
                        </TableCell>
                        <TableCell align="center">
                            <Button variant="contained" color="secondary" onClick={event => Delete(event, index)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow key={cart.length} > 
                        <TableCell align="right" colSpan="4">
                            Tổng Tiền  = 
                        </TableCell>
                        <TableCell align="center">
                            {TongTien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }
                        </TableCell>      
                        <TableCell align="center">
                            <Button variant="contained" color="secondary" onClick={(event) => BUY(event)}>BUY</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <center className="text-red-600">{(cart.length === 0)?"There are no record!":""}</center>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={cart.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
            <div className="pb-32"></div>
        </div>
    );
}
export default Cart_manage;