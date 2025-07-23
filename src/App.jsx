import { useEffect, useState } from "react";
import { search } from "./searchApi"
import "./App.css"

const api = "";

function handleInputChange(e,stateFunction){
    stateFunction(e.target.value);
}

function App(){
    const [clickedImages, setClickedImages] = useState([]);
    const [images, setImage] = useState([]);
    const [query, setQuery] = useState("");

    async function submitQuery(){
        const data = await search(api,query);
        const imagesArr = (data["inline_images"] || []).map(image => {return image["original"]["link"]});
        const shuffledImagesArr = imagesArr.sort(()=> 0.5 - Math.random());
        setImage([...shuffledImagesArr]);
    }   

    useEffect(()=>{
        images.sort(()=>0.5 - Math.random());
    },[clickedImages])

    return(
        <div>
            <input type="text" value={query} onChange={(e)=>{handleInputChange(e,setQuery)}}/>
            <button type="button" onClick={submitQuery}>SUBMIT</button>
            <div>
                {
                    images.slice(0,10).map((image,index)=>(
                        <img className="card" src={image} onClick={()=>{setClickedImages(prev=>[...prev,image])}} onError={(e) => {
                            const filtered = images.filter(item => item != image);
                            setImage(filtered);
                        }} key={"image"+index}/>
                    ))
                }
            </div>
        </div>
    )
}

export default App

// Shuffling
// Scoring when right
// Scoring when wrong
// UI