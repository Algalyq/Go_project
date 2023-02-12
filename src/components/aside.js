import search from '../images/search.svg';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { useEffect, useState } from 'react';
import { searchProducts } from '../store/actions/searchAction';
import chair from '../images/chair.webp';

function Aside({opened, setOpened, searchAction, list}){
    const [name, setName] = useState("aside");
    const [searchText, setSearchText] = useState("");
    const [datas, setData] = useState({data: []});
    useEffect(() =>{
      if(opened === true){
         setName("aside open")
      }else{
        setName("aside")
      }
    }, [opened])

    function searchAct(){
         searchAction({s:searchText})
         setData(list.data)
         console.log(list)
    }

    useEffect(()=>{
         setData(list.data)
         console.log(datas)
    }, [list])

    function setClosed(){
        setOpened(false)
    }

    function onChangeText(e){
      setSearchText(e.target.value);
    }
    return(
        <aside className={name}>
            <button className='close' onClick={setClosed}>X</button>
             <span>
                   <img src={search} alt="Search" onClick={searchAct}/>
                  <input type="text" name="search" placeholder="Search..." onChange={onChangeText}/>
             </span>
             <div className='aside-res'>
                  {
                    datas && datas.length>0  && datas.map((item, index)=>(
                      <span>
                           <img src={chair} alt="Chair" />
                           <h1>{item.producttitle}</h1>
                           <p>{item.price}.00$</p>
                      </span>
                    ))
                  }
             </div>
        </aside>
    )
}

const mapDispatchToProps = dispatch => ({
  searchAction: bindActionCreators(searchProducts, dispatch),
})

const mapStateToProps = state => ({
  list: state.searchReducers.list
})
export default connect(mapStateToProps ,mapDispatchToProps)(Aside);
