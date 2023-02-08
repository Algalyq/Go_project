import search from '../images/search.svg';
import { useEffect, useState } from 'react';

function Aside({opened, setOpened}){
    const [name, setName] = useState("aside");
    useEffect(() =>{
      if(opened === true){
         setName("aside open")
      }else{
        setName("aside")
      }
    }, [opened])

    function setClosed(){
        setOpened(false)
    }
    return(
        <aside className={name}>
            <button className='close' onClick={setClosed}>X</button>
             <span>
                   <img src={search} alt="Search"/>
                  <input type="text" name="search" placeholder="Search..."/>
             </span>
        </aside>
    )
}

export default Aside;