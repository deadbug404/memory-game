import { useEffect, useState } from "react";
import { search } from "./searchApi"
import "./App.css"

const api = "";

function handleInputChange(e,stateFunction){
    stateFunction(e.target.value);
}

function handleImageError(link,images,stateFunc){
    const filtered = images.filter(currLink => currLink != link);
    stateFunc(filtered);
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
            <div id="header">
                <div id="scores">
                    <div>Score: {scoresArr.currScore}</div>
                    <div>High Score: {scoresArr.highScore}</div>
                </div>
                <div id="query">
                    <input type="text" value={query} onChange={(e)=>{handleInputChange(e,setQuery)}} placeholder="search for images here"/>
                    <button type="button" onClick={submitQuery}>SUBMIT</button>
                </div>
            </div>
            <div id="images">
                {
                    images.slice(0,10).map(link => (
                        <img src={link} className="card" onClick={(e)=>{checkImage(e,link)}} onError={()=>{handleImageError(link,images,setImage)}}/>
                    ))
                }
            </div>
        </div>
    )
}

export default App

// UI