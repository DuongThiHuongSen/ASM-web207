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
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {useState, useEffect} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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
// import {useState, useEffect} from 'react';

// import { confirmAlert } from 'react-confirm-alert';

// import Swal from 'sweetalert2/dist/sweetalert2.js';
// import 'sweetalert2/src/sweetalert2.scss';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }




function Product_manage({ setClickRow, setformData,clickRow, cate, setcate, product }) {
    const Swal = require('sweetalert2');
    const [search, setsearch] = useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const classes = useStyles();
    const classes2 = useStyles2();
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
                    const url = `http://localhost:3040/category/${ cate[index].id }`;
                    const response = await axios.delete(url);
                    console.log(response);
                    if (response.status && response.status == 200) {
                        Swal.fire('Deleted!', '', 'success');
                    }
                } catch (error) {
                    console.error(error);
                }

                setcate(cate=[...cate.slice(0, index),...cate.slice(index+1, cate.length)]);
                
            } 
          })
        setClickRow(clickRow=-1);
    }

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    
    const searchChange = (event) => {
        setsearch(event.target.value);
    }
    // đổi Trạng thái hoạt động
    const handleChangeDense = (event, index) => {
      // event.stopPropagation();
      // setDense(event.target.checked);
      const rowUpdate = {...cate[index],status : event.target.checked };
      setformData({
        id: '',
        category_name: '',
        status : true,
        image: '',
      });
      
      Swal.fire({
        title: 'Are you sure you want to change active status of this Category ?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Confirm`,
        denyButtonText: `Cancel`,
      }).then( async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            //-------------------------
            try {
                const url = `http://localhost:3040/category/${ rowUpdate.id }`;
                const response = await axios.put(url,rowUpdate);
                console.log(response);
                if (response.status && response.status == 200) {
                    Swal.fire('Update successfully!', '', 'success');
                }
                // thay đổi status của sản phẩm thuộc danh mục này
            } catch (error) {
                console.error(error);
            }
            
            setcate(cate=[...cate.slice(0, index),rowUpdate,...cate.slice(index+1, cate.length)]);
            ChangeStatusProductFromCate(cate[index].id, rowUpdate.status);
        } 
      })
    };

    const ChangeStatusProductFromCate = (idCate, statusChange) => {
      // get list product from idcate
      const listProductChange = product.filter( element => element.cate_id == idCate);
      listProductChange.map( async (product, index) => {
        console.log(product.id);
        try {
          const url = `http://localhost:3040/product/${ product.id }`;
          const response = await axios.put(url,{...product, status: statusChange});
          console.log(response);
          if (response.status && response.status == 200) {
              // Swal.fire(`Update ${index+1} successfully!`, '', 'success');
              console.log(`Update ${index+1} successfully!`);
          }
        } catch (error) {
            console.error(error);
        }
      })
    }

    const fitercate = cate.filter( cate => {
        return cate.category_name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    });
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
                <TableCell align="center">ID</TableCell>
                <TableCell align="left">NAME</TableCell>
                <TableCell align="center">IMAGE</TableCell>
                <TableCell align="left">VISIBLE</TableCell>
                <TableCell align="center">ACTION</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {fitercate
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow key={index} onClick={event => onClickHanger(event, row, index+ page * rowsPerPage)}> 
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="left"> {row.category_name}</TableCell>
                        <TableCell align="center"><center><img src={row.image} className="h-16"/></center></TableCell>
                        <TableCell align="left" >
                        <FormControlLabel
                          control={<Switch checked={row.status} onChange={event => handleChangeDense(event, index+ page * rowsPerPage)} />}
                          label="Activate"
                        />
                        {/* <span className="text-green-600">{(row.status)?"TRUE":""}</span><span className="text-red-600">{(row.status)?"":"FALSE"}</span> */}
                        </TableCell>
                        <TableCell align="center">
                            <Button variant="contained" color="secondary" onClick={event => Delete(event, index+ page * rowsPerPage)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                  );
                })}
                </TableBody>
            </Table>
            <center className="text-red-600">{(fitercate.length == 0)?"There are no record!":""}</center>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={fitercate.length}
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