import product1 from '../images/product-1.png';
import info from '../images/info.svg';
import { Rate,  Modal, Input  } from 'antd';
import { useState } from 'react';


function Review(){
    const [value, setValue] = useState(3);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    return(
        <section className="review container">
               <div className="review_product">
                    <div className="product-item">
                            <img src={product1} alt="Chair"/>
                    </div>

                    <div className="product-action">
                           <h1>Nordic Chair</h1>
                           <span>
                                    <Rate onChange={setValue} value={value} />
                            </span>
                           <h2>$50.00</h2>
                           <p><img src={info} alt="Info"/> To prevent surface scratches and the sound of chair legs scraping on the floor, complete with FIXA self-adhesive floor protectors, sold separately.</p>
                           <button className='btn'>Add to cart</button>
                    </div>
               </div>
               <div className='review-comment'>
                      <h1>Customer Reviews</h1>
                      <button className='btn' onClick={showModal}>Write your review</button>
                      <Modal title="Review" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <span>
                                 <Rate onChange={setValue} value={value} />
                            </span>
                            <Input placeholder="Full Name" />
                            <Input placeholder="Title" />
                            <Input placeholder="Text" />
                      </Modal>
               </div>
        </section>
    )
}

export default Review;