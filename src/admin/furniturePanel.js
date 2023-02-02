import ImageUploader from "../components/imageUploader";


function FurniturePanel(){
    return(
        <section className="panel">
                <div className="panel-description">
                    <h1>Describe the details</h1>
                    <span className="panel-details">
                           <p>Name of Product*</p>
                           <input type="text" name="name" placeholder="For Example: Sofa Gucci"/>
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
                           <input type="number" name="price" placeholder="Enter Price"/>
                    </span>

                    <span className="panel-details">
                           <p>Description of Product*</p>
                           <textarea name="description" placeholder="Enter description..."></textarea>
                    </span>
                </div>

                <div className="panel-uploader">
                    <ImageUploader/>
                </div>

                <button className="submit" type="submit">Create</button>


        </section>
    )
}

export default FurniturePanel;