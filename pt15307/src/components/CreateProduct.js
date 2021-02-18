// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';


function CreateProduct({clickRow,formData, setformData,setproduct,product,setClickRow}) {
    const Swal = require('sweetalert2');

    const onSubmitHanger = async (event) => {
        event.preventDefault(); // không load lại trang
        if(clickRow != -1){ // cập nhật thông tin
            try {
                const url = `https://600e390d3bb1d100179de8b4.mockapi.io/products/product/${formData.id}`;
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
                const url = `https://600e390d3bb1d100179de8b4.mockapi.io/products/product`;
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
    

    const myChangeHandler = (event) => {
        const {name,value} = event.target;
        setformData({...formData,[name]:value});
        // console.log(formData);
    }
    const myClickClear = (event) => {
        setClickRow(-1);
        setformData({
            id: '',
            name: '',
            price: ''
          });
    }

    // onChange={ myChangeHandler}
    return(
        <div>
            <form onSubmit={onSubmitHanger}>
                <TextField fullWidth variant="filled" label="id" name="id" 
                    value={formData.id} 
                    onChange={ myChangeHandler}/>
                <TextField fullWidth variant="filled" label="name"  name="name" 
                    value={formData.name}
                    onChange={ myChangeHandler}/>
                <TextField fullWidth variant="filled" label="price"  name="price" 
                    value={formData.price}
                    onChange={ myChangeHandler}/>
                <Button variant="contained" color="secondary" type="submit">SUBMIT</Button>
                <Button variant="contained" color="secondary" onClick={myClickClear} >Clear Form</Button>
            </form>
            <br></br>
        </div>
    );
}
export default CreateProduct;