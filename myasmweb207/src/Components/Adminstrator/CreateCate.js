// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function CreateCate({clickRow, setClickRow,formData, setformData, cate, setcate}) {
    const classes = useStyles();
    const CatehandleChange = (event) => {
        setformData({...formData,cate_id:event.target.value});
    };
    const Swal = require('sweetalert2');
    const onSubmitHanger = async (event) => {
        event.preventDefault(); // không load lại trang
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
    

    const myChangeHandler = (event) => {
        const {name,value} = event.target;
        setformData({...formData,[name]:value});
        // console.log(formData);
    }
    const maxID = Math.max.apply(Math, cate.map(x => x.id));

    const myClickClear = (event) => {
        setClickRow(-1);
        setformData({
            id: maxID+1,
            category_name: '',
            status : true,
            image: ""
          });
    }

    const handleChangeDense = (event) => {
        // setDense(event.target.checked);
        setformData({...formData,status: event.target.checked});
        console.log(event.target.checked);
      };

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
                    onChange={ myChangeHandler}/>
                <TextField fullWidth variant="filled" label="Category_name"  name="category_name" 
                    value={formData.category_name}
                    onChange={ myChangeHandler}/>
                <span className="ml-8">   </span>
                    
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
export default CreateCate;