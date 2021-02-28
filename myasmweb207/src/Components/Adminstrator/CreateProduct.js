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
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function CreateProduct({clickRow,formData, setformData,setproduct,product,setClickRow, cate, setcate}) {
    const classes = useStyles();
    const CatehandleChange = (event) => {
        setformData({...formData,cate_id:event.target.value});
    };
    const Swal = require('sweetalert2');
    const [fileUpload, setfileUpload] = useState(null);
    // const [fileUpload, setfileUpload] = useState(null);
    
    const handleChangeDense = (event) => {
        setformData({...formData,status: event.target.checked});
        // console.log(event.target.checked);
      };
    const onSubmitHanger = async (event) => {
        event.preventDefault(); // không load lại trang
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
                    setproduct(product=[...product, response.data]); // set lại Products
                    Swal.fire('Create new record successfully!', '', 'success');
                    myClickClear();
                }
            } catch (error) {
                console.error(error)
            }
        }
        
    }
    

    const imageHandler = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState){
                setfileUpload(reader.result);  
                setformData({...formData,image:reader.result});              
            }
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    const myChangeHandler = (event) => {
        const {name,value} = event.target;
        setformData({...formData,[name]:value});
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
    }

    
    const divStyle = {
       height: '5px',
       width:'100%',
      };

    
    // onChange={ myChangeHandler}
    return(
        <div>
            <form onSubmit={onSubmitHanger} encType="multipart/form-data">
                <TextField fullWidth variant="filled" label="id" name="id" disabled="true"
                    value={formData.id} 
                    onChange={ myChangeHandler}/>
                <TextField fullWidth variant="filled" label="name"  name="name" 
                    value={formData.name}
                    onChange={ myChangeHandler}/>
                <TextField fullWidth variant="filled" label="description" name="description" 
                    value={formData.description} 
                    onChange={ myChangeHandler}/>
                <TextField fullWidth variant="filled" label="price"  name="price" 
                    value={formData.price}
                    onChange={ myChangeHandler}/>
                <TextField fullWidth variant="filled" label="quantity" name="quantity" 
                    value={formData.quantity} 
                    onChange={ myChangeHandler}/>
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
                    </FormControl>
                    
                    <div>

                        <Button variant="contained" component="label"  >
                            Upload File
                            <input type="file" hidden name="image" accept="image/*" onChange={imageHandler}/>
                        </Button>
                        <center><img src={formData.image} width="400px" className="rounded-2xl"/></center>
                        
                    </div>
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