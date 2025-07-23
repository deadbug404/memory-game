import { useState } from "react";
import { search } from "./searchApi"
import "./App.css"

const api = "";

function handleInputChange(e,stateFunction){
    stateFunction(e.target.value);
}

function App(){
    const [images, setImage] = useState([]);
    const [query, setQuery] = useState("");

    async function submitQuery(){
        const data = await search(api,query);
        const imagesArr = (data["inline_images"] || []).map(image => {return image["original"]["link"]});
        const shuffledImagesArr = imagesArr.sort(()=> 0.5 - Math.random());
        console.log(shuffledImagesArr);
        setImage([...shuffledImagesArr]);
    }   

    return(
        <div>
            <input type="text" value={query} onChange={(e)=>{handleInputChange(e,setQuery)}}/>
            <button type="button" onClick={submitQuery}>SUBMIT</button>
            <div>
                {
                    images.slice(0,10).map((image,index)=>(
                        <img className="card" src={image} onError={(e) => {
                            const filtered = images.filter(item => item != image);
                            setImage([...filtered]);
                        }} key={"image"+index}/>
                    ))
                }
            </div>
        </div>
    )
}

export default App