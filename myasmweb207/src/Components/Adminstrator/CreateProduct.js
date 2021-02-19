// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {useState} from 'react';

function CreateProduct({clickRow,formData, setformData,setproduct,product,setClickRow}) {
    const Swal = require('sweetalert2');
    const [fileUpload, setfileUpload] = useState(null);
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
                }
            } catch (error) {
                console.error(error)
            }
            
        }else{
            console.log("Click row onsubmit: == -1 ",clickRow);
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

    const myClickClear = (event) => {
        setClickRow(-1);
        setformData({
            id: product.length+1,
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
                <div>

                    <Button variant="contained" component="label" >
                        Upload File
                        <input type="file" hidden name="image" accept="image/*" onChange={imageHandler}/>
                    </Button>
                    <img src={formData.image} width="200px"/>
                    
                </div>
                <div style={divStyle}></div>
                <Button variant="contained" color="secondary" type="submit">SUBMIT</Button>
                <Button variant="contained" color="secondary" onClick={myClickClear} >Clear Form</Button>
            </form>
            <br></br>
        </div>
    );
}
export default CreateProduct;