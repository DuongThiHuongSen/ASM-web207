import Table from '@material-ui/core/Table';
import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TablePagination from '@material-ui/core/TablePagination';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    product : PropTypes.array.isRequired,
    orders : PropTypes.array.isRequired,
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

function Order_manage({orders, product }) {
    var rs = [];
    const Swal = require('sweetalert2');
    const [search, setsearch] = useState("");
    const [ids, setids] = useState([]);
    const [resultfilter, setresultfilter] = useState([...orders]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const classes = useStyles();
    const classes2 = useStyles2();
    const [filterStatus, setfilterStatus] = useState(false);

    // const isSelected = (name) => selected.indexOf(name) !== -1;
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const searchChange = (event) => {
        setsearch(event.target.value.trim());
        // list sản phẩm 
        const proSearch = product.filter( p => {
            return p.name.toLowerCase().indexOf(event.target.value.trim().toLowerCase()) !== -1;
          }).map( x => x.id );
  
        setids(proSearch); // list id của sản phầm cần tìm hóa đơn
        proSearch.forEach(function(item, index, array) {
          orders.forEach( 
            function(or, idx){
              if(or.pro_id == item){
                rs.push(or);
              }
            }
          )
        });
        // console.log("Hóa đơn có id sản phẩm trùng id sản phẩm tìm được bằng filter");
        // console.log(rs);
        setresultfilter(rs);
        setfilterStatus(true);
    }
    
    const foundProductByID = (product, id) => {
      return product.find(x => x.id == id);
    }
  
    // setresultfilter((resultfilter.length != 0)?resultfilter: orders);

    return(
        <div>
            <center>
            <Paper component="form" className={classes2.root}>
            
            <InputBase
                className={classes2.input}
                placeholder="Search Order By Product Name"
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
                <TableCell align="left">PRODUCT</TableCell>
                <TableCell align="center">IMAGE</TableCell>
                <TableCell align="left">TOTAL</TableCell>
                <TableCell align="left">DATE ORDER</TableCell>
                <TableCell align="left">TOTAL MONEY (VNĐ)</TableCell>
                {/* <TableCell align="center">ACTION</TableCell> */}
                </TableRow>
                </TableHead>
                <TableBody>
                {stableSort((filterStatus == true)? resultfilter : orders , getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                //   const isItemSelected = isSelected(row.id);
                //   const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow key={index}> 
                      <TableCell align="center">{index+ page * rowsPerPage + 1}</TableCell>
                      <TableCell align="left"> {(foundProductByID(product,row.pro_id))?foundProductByID(product,row.pro_id).name : <span className="text-gray-500">This product does not exist!</span>}</TableCell>
                      <TableCell align="center" >
                        <center>
                          <img 
                            src={(foundProductByID(product,row.pro_id))?foundProductByID(product,row.pro_id).image : ""} 
                            className="h-16"/>
                        </center></TableCell>
                      <TableCell align="left" >{row.total}</TableCell>
                      <TableCell align="left" >{row.date}</TableCell>
                      <TableCell align="left" >{row.total_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</TableCell>
                      {/* <TableCell align="center">
                          <Button variant="contained" color="secondary" onClick={event => Delete(event, orders.indexOf(row))}>Delete</Button>
                      </TableCell> */}
                      </TableRow>
              
                  );
                })}
                </TableBody>
            </Table>
            <center className="text-red-600">{((resultfilter.length == 0  && filterStatus == true) || (orders.length == 0))?"There are no record!":""}</center>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={(filterStatus == true)? resultfilter.length : orders.length}
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
export default Order_manage;
Order_manage.propTypes = propTypes;