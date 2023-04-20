import { bindActionCreators } from "redux";
import ImageUploader from "../components/imageUploader";
import { createProducts } from "../store/actions/productAction";
import {connect} from 'react-redux'
import { useState } from "react";


function FurniturePanel({createProductAction, isLoading}){
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [file, setFile] = useState(null)

    function onChangeName(e){
        setName(e.target.value)
    }

    function onChangePrice(e){
        setPrice(e.target.value)
    }

    function onChangeDescr(e){
        setDescription(e.target.value)
    }

    function onChangeFile(data){
        console.log(data)
        setFile(data)
    }
    const formData = new FormData();

   
      
    function createProduct(){
           formData.append('producttitle', name);
           formData.append('price', price);
           formData.append('sellerID', 1);
           formData.append('quantity', 10);
           formData.append('pddesc', description);
           formData.append('categoryID', 1);
           file.forEach((item, index) => {
            formData.append(`uploaded_images`, item);
          });
          createProductAction(formData);
    }
    return(
        <section className="panel">
                <div className="panel-description">
                    <h1>Describe the details</h1>
                    <span className="panel-details">
                           <p>Name of Product*</p>
                           <input type="text" name="name" onChange={onChangeName} placeholder="For Example: Sofa Gucci"/>
                    </span>
                    
                    <span className="panel-details">
                           <p>Category of Product*</p>
                           <select id="furniture-category" name="category">
                                    <option value="">--Please choose an option--</option>
                                    <option value="living-room">Living Room</option>
                                    <option value="bedroom">Bedroom</option>
                                    <option value="dining-room">Dining Room</option>
                                    <option value="bathroom">Bathroom</option>
                                    <option value="office">Office</option>
                            </select>
                    </span>

                    <span className="panel-details">
                           <p>Price of Product*</p>
                           <input type="number" name="price" onChange={onChangePrice} placeholder="Enter Price"/>
                    </span>

                    <span className="panel-details">
                           <p>Description of Product*</p>
                           <textarea name="description" onChange={onChangeDescr} placeholder="Enter description..."></textarea>
                    </span>
                </div>

                <div className="panel-uploader">
                    <ImageUploader onChangeFile={onChangeFile}/>
                </div>

                <button className="submit" type="submit" onClick={createProduct}>Create</button>


        </section>
    )
}
const mapDispatchToProps = dispatch => ({
    createProductAction: bindActionCreators(createProducts, dispatch)
  })
  
  const mapStateToProps = state => ({
    loading: state.productReducers.isLoading
  })
  export default connect(mapStateToProps ,mapDispatchToProps)(FurniturePanel);