// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {useState} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';

const propTypes = { // cart nhan vao phai la array .isRequied la yeu cau phai co
    clickRow : PropTypes.number.isRequired,
    formData : PropTypes.object.isRequired,
    setformData: PropTypes.func.isRequired,
    setproduct: PropTypes.func.isRequired,
    product : PropTypes.array.isRequired,
    setClickRow: PropTypes.func.isRequired,
    cate: PropTypes.array.isRequired, // chuỗi các category

};

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function CreateProduct({clickRow,formData, setformData,setproduct,product,setClickRow, cate}) {

    const classes = useStyles();
    const CatehandleChange = (event) => {
        setformData({...formData,cate_id:event.target.value});
        console.log("validtae 34");
        if(event.target.value.length == 0){
            err.errcate = "Category is required!";
        }
        seterrs(err);
        // ValidateForm({...formData,cate_id:event.target.value});
    };
    const Swal = require('sweetalert2');
    const [fileUpload, setfileUpload] = useState(null);
    var err = {
        errname: '',
        errcate: '',
        errdescription: '',
        errimage: '',
        errquantity: '',
        errprice: ''
    };
    const [errs, seterrs] = useState(err);
    // const [fileUpload, setfileUpload] = useState(null);
    
    const handleChangeDense = (event) => {
        setformData({...formData,status: event.target.checked});
        // console.log(event.target.checked);
      };
    const onSubmitHanger = async (event) => {
        event.preventDefault(); // không load lại trang
        console.log(formData);
        ValidateForm(formData);
        
        if( err.errname.length == 0 && 
            err.errcate.length == 0 &&
            err.errimage.length == 0 &&
            err.errprice.length == 0 &&
            err.errdescription.length == 0 &&
            err.errquantity.length == 0
            ){
                if(clickRow != -1){ // cập nhật thông tin
                    try {
                        const url = `http://localhost:3040/product/${formData.id}`;
                        const response = await axios({
                            method:'PUT',
                            url: url,
                            data: formData,
                        });
                        if(response.status && response.status == 200){
                            setproduct(product=[...product.slice(0, clickRow),formData, ...product.slice(clickRow+1, product.length)]); // set lại Products
                            Swal.fire('Update successfully!', '', 'success');
                            // console.log("product : ");
                            // console.log(product);
                        }
                    } catch (error) {
                        console.error(error)
                    }
                    
                }else{
                    // console.log("Click row onsubmit: == -1 ",clickRow);
                    //Thêm một dòng mới
                    try {
                        const url = `http://localhost:3040/product`;
                        const response = await axios({
                            method:'POST',
                            url: url,
                            data: formData,
                        });
                        if(response.status && response.status == 201){
                            // console.log(response);
                            setproduct([...product, response.data]); // set lại Products
                            Swal.fire('Create new record successfully!', '', 'success');
                            myClickClear();
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }
        }else{
            console.log(err);
        }
        
        
    }
    
    const ValidateForm = (Data) => {
        console.log("đã validate");
        if(Data.name.trim().length == 0 ){
            err.errname = "Name is required!";
        }
        if(Data.description.trim().length == 0){
            err.errdescription = "Description is required!";
        }else if(Data.description.trim().length > 50){
            err.errdescription = "Description is too long, maxlength = 50 !";
        }

        if(Data.price.length == 0){
            err.errprice = "Price is required!";
        }else if(Data.price*1 != Data.price){
            err.errprice = "Price is a number!";
        }else if(Data.price*1 <= 0 ){
            err.errprice = "Price is invalid!";
        }
        if(Data.quantity.length == 0){
            err.errquantity = "Quantity is required!";
        }else if(Data.quantity*1 != Data.quantity){
            err.errquantity = "Quantity is a number!";
        }else if(Data.quantity*1< 0){
            err.errquantity = "Quantity is invalid !";
        }
        if(Data.image.length == 0){
            err.errimage = "Image is required!";
        }
        if(Data.cate_id.length == 0){
            err.errcate = "Category is required!";
        }
        
        seterrs(err);
    }

    const imageHandler = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState){
                setfileUpload(reader.result);  
                setformData({...formData,image:reader.result}); 
                ValidateForm({...formData,image:reader.result});             
            }
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    const myChangeHandler = (event) => {
        const {name,value} = event.target;
        setformData({...formData,[name]:value});
        ValidateForm({...formData,[name]:value});
        // console.log(formData);
    }
    // const maxID = Math.max.apply(Math, product.map(x => x.id));

    const myClickClear = (event) => {
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
        seterrs(err);
    }

    
    const divStyle = {
       height: '5px',
       width:'100%',
      };
    
    
    // onChange={ myChangeHandler}
    return(
        <div>
            <form onSubmit={onSubmitHanger} encType="multipart/form-data">
                <TextField 
                    fullWidth 
                    variant="filled" 
                    label="id" 
                    name="id" 
                    disabled="true"
                    value={formData.id} 
                    onChange={ myChangeHandler}
                 />
                
                <TextField 
                    fullWidth 
                    variant="filled" 
                    label="name"  
                    name="name" 
                    value={formData.name}
                    onChange={ myChangeHandler}
                    />
                <span className="text-red-700 text-xs"> {(errs.errname.length > 0)?errs.errname:""}</span>
                
                <TextField 
                    fullWidth 
                    variant="filled" 
                    label="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={ myChangeHandler}
                 />
                 {<span className="text-red-700 text-xs"> {(errs.errdescription.length > 0)?errs.errdescription:''}</span>}
                <TextField 
                    fullWidth 
                    variant="filled" 
                    label="price"  
                    name="price" 
                    value={formData.price}
                    onChange={ myChangeHandler}
                 />
                 {<span className="text-red-700 text-xs"> {(errs.errprice)?errs.errprice:''}</span>}
                <TextField 
                    fullWidth 
                    variant="filled" 
                    label="quantity" 
                    name="quantity" 
                    value={formData.quantity} 
                    onChange={ myChangeHandler}
                 />
                  {<p className="text-red-700 text-xs"> {(errs.errquantity)?errs.errquantity:''}</p>}
                    <FormControlLabel
                        control={<Switch checked={formData.status} onChange={handleChangeDense} />}
                        label="Activate"
                    />
                    <span className="ml-8">   </span>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.cate_id}
                        onChange={CatehandleChange}
                        >
                        {cate.map((value, index) => (
                            <MenuItem key={index} value={value.id} >{value.category_name}</MenuItem>
                        ))}
                        
                        </Select>
                        {<p className="text-red-700 text-xs"> {(errs.errcate)?errs.errcate:''}</p>}
                    </FormControl>
                  
                    <div>

                        <Button variant="contained" component="label"  >
                            Upload File
                            <input type="file" hidden name="image" accept="image/*" onChange={imageHandler}/>
                        </Button>
                        <center><img src={formData.image} width="400px" className="rounded-2xl"/></center>
                        
                    </div>
                    {<span className="text-red-700 text-xs"> {(errs.errimage)?errs.errimage:''}</span>}
                    <div style={divStyle}></div>
                    <Button variant="contained" color="secondary" type="submit">SUBMIT</Button>
                    <span className="mr-12">   </span>
                    <Button variant="contained" color="primary" onClick={myClickClear} >Clear Form</Button>
                    
            </form>

            <br></br>
        </div>
    );
}
export default CreateProduct;
CreateProduct.propTypes = propTypes;