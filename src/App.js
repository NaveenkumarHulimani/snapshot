
import './App.css';
import {useEffect,useRef, useState} from 'react'
import axios from 'axios';

function App() {
  const searchData=useRef(null);
  const [searchText,setSearchText]=useState('mountains');
  const [imageData,setImageData]=useState([])
  useEffect(()=>{
    const params={
      method:'flickr.photos.search',
      api_key:'a970a0fc37e3816eb3f40974cbb2ccd1',
      text:searchText,
      sort:'',
      per_page:40,
      licence:'4',
      extras:'owner-name, license',
      format:'json',
      nojsoncallback:1
    }
    const parameters=new URLSearchParams(params);
    const url=`https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((res)=>{
      console.log(res.data)
      const arr=res.data.photos.photo.map((imgData)=>{
        return fetchFlickrImageurl(imgData,'q')
      });
     setImageData(arr)
    }).catch(()=>{

    }).finally(()=>{

    })
  },[searchText])
  const fetchFlickrImageurl=(photo,size)=>{
   let url=`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
   if(size){
    url +=`_${size}`
   }
   url +=".jpg"
   return url
  }
  
  return (
   <>
   <input onChange={(e)=>{searchData.current=e.target.value}} />
   <button onClick={()=>{setSearchText(searchData.current)}}>Search</button>
   <section>
    <button  onClick={()=>{setSearchText('mountains')}}>Mountains</button>
    <button  onClick={()=>{setSearchText('Beaches')}}>Beaches</button>
    <button  onClick={()=>{setSearchText('Birds')}}>Birds</button>
    <button  onClick={()=>{setSearchText('Food')}}>Food</button>
   </section>
   <section className='image-container'>
    
      {imageData.map((imageurl,key)=>{
        return <article className='flickr-image'>
          <img src={imageurl} key={key} alt={'my-img'}/>
          </article>
      })}
   
   </section>
   </>
  );
}

export default App;



