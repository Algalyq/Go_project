import search from '../images/search.svg';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { useEffect, useState } from 'react';
import { searchProducts } from '../store/actions/searchAction';

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
         searchAction({data:searchText})
         setData(list.data)
         console.log(list)
    }

    useEffect(()=>{
         setData(list.data)
         console.log(datas)
    }, [list])

    function onChangeText(e){
      setSearchText(e.target.value);
    }

    function setClosed(){
        setOpened(false)
        setData({data: []})
        setSearchText("")
    }

    
    return(
        <aside className={name}>
            <button className='close' onClick={setClosed}>X</button>
             <span>
                   <img src={search} alt="Search" onClick={searchAct}/>
                  <input type="text" name="search" placeholder="Search..." value={searchText} onChange={onChangeText}/>
             </span>
             <div className='aside-res'>
                      
                      <span>
                           <img src={require(`../../src/images/product-3.png`)} alt="Chair" />
                           <h1>Test</h1>
                           <p>1.00$</p>
                      </span>
                      
                  
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
