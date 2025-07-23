import { useEffect, useState } from "react";
import { search } from "./searchApi"
import "./App.css"

const api = "";

function handleInputChange(e,stateFunction){
    stateFunction(e.target.value);
}

function App(){
    const [clickedImages, setClickedImages] = useState([]);
    const [scoresArr, setScores] = useState({currScore:0,highScore:0});
    const [images, setImage] = useState([]);
    const [query, setQuery] = useState("");

    async function submitQuery(){
        const data = await search(api,query);
        const imagesArr = (data["inline_images"] || []).map(image => {return image["original"]["link"]});
        const shuffledImagesArr = imagesArr.sort(()=> 0.5 - Math.random());
        setImage([...shuffledImagesArr]);
    }   

    function checkImage(e,image){
        const link = e.target.src;
        let score = scoresArr.currScore;
        let currHighScore = scoresArr.highScore;

        if(clickedImages.includes(image)){
            setScores(prev => ({...prev,currScore:0}));
            if(score > currHighScore){setScores(prev=>({...prev,highScore:score}))};
            setClickedImages([]);
            return
        }
        else{
            setScores(prev => ({...prev,currScore:score++}));
        }

        setClickedImages(prev=>[...prev,image]);
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
                        <img className="card" src={image} onClick={(e)=>checkImage(e,image)} onError={(e) => {
                            const filtered = images.filter(item => item != image);
                            setImage(filtered);
                        }} key={"image"+index}/>
                    ))
                }
            </div>
            <div>Score: {scoresArr.currScore}</div>
            <div>High Score: {scoresArr.highScore}</div>
        </div>
    )
}

export default App

// Scoring when right
// Scoring when wrong
// UI