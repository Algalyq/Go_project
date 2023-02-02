import React, { useState } from 'react';

function ImageUploader() {
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    setImages([...images, ...event.target.files]);
  };

  return (
    <div>
      <h1>Images</h1>
      <p>First image will cover of products* </p>
      <span>
      <div className='images'>
        <button className='input-file'>
                <input type="file" multiple onChange={handleImageChange} />
                Upload Photo
        </button>
        {images.map((image, index) => (
          <img key={index} src={URL.createObjectURL(image)} alt="Uploaded Images" />
        ))}
      </div>
      </span>
    </div>
  );
}

export default ImageUploader;