import product1 from '../images/product-1.png';
import info from '../images/info.svg';
import { Rate,  Modal, Input  } from 'antd';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { BASE_URL2 } from '../config/baseurl2';
import { createComment, getComment } from '../store/actions/commentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


function Review({comments, commentAction, getCommentAction}){
    const {id} = useParams()
    const [value, setValue] = useState(3);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([])
    const [textCom, setTextCom] = useState("")
    const [comment, setComment] = useState(null)


    useEffect(() =>{

          axios.get(
              `${BASE_URL2}/products/${id}`,
              {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}
            ).then(response => {
              const data = response.data;
              setData(data);
            }).catch(error => {
              console.error(error)
            });
     
  }, [id])

 

  useEffect(()=>{
        getCommentAction({id})
  }, [])

  useEffect(()=>{
        setComment(comments)
  }, [comments])

  console.log(comment)


    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      createComments()
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    function onChangeText(e){
      setTextCom(e.target.value)
    }

    function createComments(){
         commentAction({
            ProductID: id,
            BodyComment: textCom,
            star: value
          })
    }
  
    return(
        <section className="review container">
               <div className="review_product">
                    <div className="product-item">
                            <img src={data && data.images && data.images[0].image} alt="Chair"/>
                    </div>

                    <div className="product-action">
                           <h1>{data.producttitle}</h1>
                           <span>
                                    <Rate onChange={setValue} value={value} />
                            </span>
                           <h2>${data.price}.00</h2>
                           <p><img src={info} alt="Info"/> To prevent surface scratches and the sound of chair legs scraping on the floor, complete with FIXA self-adhesive floor protectors, sold separately.</p>
                           <button className='btn'>Add to cart</button>
                    </div>
               </div>
               <div className='review-comment'>
                      <h1>Customer Reviews</h1>
                      <div className='comments'>
                            {
                              comment && comment.length>0 && comment.map((item, index) => (
                                <div className='comments-item' key={index}>
                                    <h1>Alzhan Akhmetkerey</h1>
                                    <p>{item.BodyComment}</p>
                                </div>
                              ))
                            }
                      </div>
                      <button className='btn' onClick={showModal}>Write your review</button>
                      <Modal title="Review" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <span>
                                 <Rate onChange={setValue} value={value} />
                            </span>
                            <Input placeholder="Text" onChange={onChangeText} />
                      </Modal>
               </div>
        </section>
    )
}
const mapDispatchToProps = dispatch => ({
  commentAction: bindActionCreators(createComment, dispatch),
  getCommentAction: bindActionCreators(getComment, dispatch)
})

const mapStateToProps = state => ({
  comments: state.commentReducers.comments
})
export default connect(mapStateToProps, mapDispatchToProps)(Review);