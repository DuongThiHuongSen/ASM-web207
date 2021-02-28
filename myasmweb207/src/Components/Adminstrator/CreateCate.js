// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import React from 'react';
import {useState} from 'react';


function CreateCate({clickRow, setClickRow,formData, setformData, cate, setcate}) {
    const err = {
        errname: '',
        errimage: ''
    };
    const [errs, seterrs] = useState(err);
    const Swal = require('sweetalert2');

    const ValidateForm = (Data) => {
        if(Data.category_name.trim().length == 0 ){
            err.errname = "Category name is required!";
        }
        if(Data.image.length == 0){
            err.errimage = "Image is required!";
        }
        seterrs(err);
    }

    const onSubmitHanger = async (event) => {
        event.preventDefault(); // không load lại trang
        ValidateForm(formData);
        if( err.errname.length == 0 && 
            err.errimage.length == 0 
        ){
            if(clickRow != -1){ // cập nhật thông tin
                try {
                    const url = `http://localhost:3040/category/${formData.id}`;
                    const response = await axios({
                        method:'PUT',
                        url: url,
                        data: formData,
                    });
                    // axios.put(url, formData)
                    // .then((result)=>{
                    //     console.log(result);
                    // })
                    if(response.status && response.status == 200){
                        setcate(cate=[...cate.slice(0, clickRow),formData, ...cate.slice(clickRow+1, cate.length)]); // set lại Products
                        Swal.fire('Update successfully!', '', 'success');
                    }
                } catch (error) {
                    console.error(error)
                }
                
            }else{
                console.log("Click row onsubmit: == -1 ",clickRow);
                //Thêm một dòng mới
                try {
                    const url = "http://localhost:3040/category";
                    const response = await axios({
                        method:'POST',
                        url: url,
                        data: formData,
                    });
                    if(response.status && response.status == 201){
                        // console.log(response);
                        setcate(cate=[...cate, response.data]); // set lại Products
                        Swal.fire('Create new record successfully!', '', 'success');
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        
        }
        
        
        
    }
    

    const myChangeHandler = (event) => {
        const {name,value} = event.target;
        setformData({...formData,[name]:value});
        ValidateForm({...formData,[name]:value});
        // console.log(formData);
    }
    
    const myClickClear = (event) => {
        setClickRow(-1);
        setformData({
            id: '',
            category_name: '',
            status : true,
            image: ""
          });
          seterrs(err);
    }

    const divStyle = {
       height: '5px',
       width:'100%',
      };

    const imageHandler = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState){
                // setfileUpload(reader.result);  
                setformData({...formData,image:reader.result});
                ValidateForm({...formData,image:reader.result});           
            }
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    

    
    // onChange={ myChangeHandler}
    return(
        <div>
            <form onSubmit={onSubmitHanger} >
                <TextField fullWidth variant="filled" label="Category_id" name="id" 
                    value={formData.id} 
                    onChange={ myChangeHandler}
                    disabled
                />

                <TextField fullWidth variant="filled" label="Category_name"  name="category_name" 
                    value={formData.category_name}
                    onChange={ myChangeHandler}/>
                <span className="ml-8">   </span>
                <span className="text-red-700 text-xs"> {(errs.errname.length > 0)?errs.errname:""}</span>
                <div>

                    <Button variant="contained" component="label"  >
                        Upload File
                        <input type="file" hidden name="image" accept="image/*" onChange={imageHandler}/>
                    </Button>
                    <center><img src={formData.image} width="400px" className="rounded-2xl"/></center>
                    {<span className="text-red-700 text-xs"> {(errs.errimage)?errs.errimage:''}</span>}
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
export default CreateCate;