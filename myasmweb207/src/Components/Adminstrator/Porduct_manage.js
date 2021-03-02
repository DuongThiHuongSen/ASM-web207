import Table from '@material-ui/core/Table';
import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TablePagination from '@material-ui/core/TablePagination';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    product : PropTypes.array.isRequired, // cart nhan vao phai la array .isRequied la yeu cau phai co
    setcart : PropTypes.func.isRequired,
    clickRow : PropTypes.number.isRequired,
    setClickRow: PropTypes.func.isRequired,
    formData : PropTypes.object.isRequired,
    setformData : PropTypes.func.isRequired,
    setproduct: PropTypes.func.isRequired,
    cate: PropTypes.array.isRequired, // chuỗi các category
};

const useStyles2 = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

function Product_manage({product, setClickRow, setformData, setproduct,clickRow, cate }) {
    const Swal = require('sweetalert2');
    const [search, setsearch] = useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const classes = useStyles();
    const classes2 = useStyles2();

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
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
                    // console.log(response);
                    if (response.status && response.status == 200) {
                        Swal.fire('Deleted!', '', 'success');
                        setClickRow(-1);
                        setformData({
                            id: '',
                            name: '',
                            price: '',
                            cate_id: '',
                            status : true,
                            quantity: '',
                            image:'',
                            description: ''
                          });
                        
                    }
                } catch (error) {
                    console.error(error);
                }
                setproduct(product=[...product.slice(0, index),...product.slice(index+1, product.length)]);

            } 
          })
        setClickRow(clickRow=-1);
    }

    const foundCate = (cate , id) => {
        return cate.find(x => x.id == id);
    }
    
    const searchChange = (event) => {
        setsearch(event.target.value.trim());
    }
    const fiterProduct = product.filter( p => 
      { return (p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) 
        || (p.description.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        || (foundCate(cate, p.cate_id).category_name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      });
    // đổi Trạng thái hoạt động
    const handleChangeDense = (event, index) => {
      // event.stopPropagation();
      // setDense(event.target.checked);
      const rowUpdate = {...product[index],status : event.target.checked };
      setformData({
        id: '',
        name: '',
        price: '',
        cate_id: '',
        status : true,
        quantity: '',
        image:'',
        description: ''
      });
      
      Swal.fire({
        title: 'Are you sure you want to change active status of this Product ?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Confirm`,
        denyButtonText: `Cancel`,
      }).then( async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            //-------------------------
            try {
                const url = `http://localhost:3040/product/${ rowUpdate.id }`;
                const response = await axios.put(url,rowUpdate);
                console.log(response);
                if (response.status && response.status == 200) {
                    Swal.fire('Update successfully!', '', 'success');
                }
            } catch (error) {
                console.error(error);
            }
            // setcate(cate=[...cate.slice(0, index),rowUpdate,...cate.slice(index+1, cate.length)]);
            setproduct(product=[...product.slice(0, index),rowUpdate,...product.slice(index+1, product.length)]);
        } 
      })
    };
    // console.log("filter product");
    // console.log(fiterProduct);
    return(
        <div>
            <center>
            <Paper component="form" className={classes2.root}>
            
            <InputBase
                className={classes2.input}
                placeholder="Search Product"
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={ searchChange }
            />
            <IconButton type="submit" className={classes2.iconButton} aria-label="search" >
                <SearchIcon />
            </IconButton>
            
            </Paper>
            </center>
            <br/>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                <TableCell align="center">NO.</TableCell>
                <TableCell align="left">NAME</TableCell>
                <TableCell align="center">IMAGE</TableCell>
                <TableCell align="left">DESCRIPTION</TableCell>
                <TableCell align="left">PRICE</TableCell>
                <TableCell align="left">QUANTITY</TableCell>
                <TableCell align="left">VISIBLE</TableCell>
                <TableCell align="center">CATEGORY</TableCell>
                <TableCell align="center">ACTION</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {product.filter( p => 
                                  { return (p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) 
                                    || (p.description.toLowerCase().indexOf(search.toLowerCase()) !== -1)
                                    || (foundCate(cate, p.cate_id).category_name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
                                  }
                                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow key={row.id} onClick={event => onClickHanger(event, row, page * rowsPerPage + index)}> 
                      <TableCell align="center">{page * rowsPerPage + index +1}</TableCell>
                      <TableCell align="left"> {row.name}</TableCell>
                      <TableCell align="center" ><center><img src={row.image} className="h-16"/></center></TableCell>
                      <TableCell align="left" >{row.description}</TableCell>
                      <TableCell align="left" >{row.price}</TableCell>
                      <TableCell align="left" >{row.quantity}</TableCell>
                      <TableCell align="left" >
                        <FormControlLabel
                            control={<Switch checked={row.status} onChange={event => handleChangeDense(event, index+ page * rowsPerPage)} />}
                            label="Activate"
                          />
                        {/* <span className="text-green-600">{(row.status)?"TRUE":""}</span><span className="text-red-600">{(row.status)?"":"FALSE"}</span> */}
                     </TableCell>
                      <TableCell align="center" >{(foundCate(cate, row.cate_id))?foundCate(cate, row.cate_id).category_name : "Danh mục không tồn tại"}</TableCell>
                      <TableCell align="center">
                          <Button variant="contained" color="secondary" onClick={event => Delete(event, page * rowsPerPage + index)}>Delete</Button>
                      </TableCell>
                      </TableRow>
              
                  );
                })}
                
                </TableBody>
            </Table>
            <center className="text-red-600">{(fiterProduct.length == 0)?"There are no record!":""}</center>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={product.filter( p => 
                  { return (p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) 
                    || (p.description.toLowerCase().indexOf(search.toLowerCase()) !== -1)
                    || (foundCate(cate, p.cate_id).category_name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
                  }
                ).length}
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
export default Product_manage;