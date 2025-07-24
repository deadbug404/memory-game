import { useEffect, useState } from "react"
import { search } from "./searchApi"
import "./App.css"

const api = import.meta.env.VITE_API_KEY;

function handleInputChange(e,stateFunction){
    stateFunction(e.target.value);
}

function handleImageError(link,images,stateFunc){
    let filtered = images.filter(currLink => currLink != link);
    stateFunc([...filtered]);
}

function cleanImageURL(url) {
  return url.replace(/(\.(jpg|jpeg|png|gif|webp|bmp|svg))[^.]*$/i, '$1');
}

function App(){
    const [clickedImages, setClickedImages] = useState([]);
    const [scoresArr, setScores] = useState({currScore:0,highScore:0});
    const [images, setImage] = useState([]);
    const [query, setQuery] = useState("");

    async function submitQuery(){
        const data = await search(api,query);
        const imagesArr = (data || []).map(object => {return object["original"]["link"]});
        setImage([...imagesArr]);
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
            setScores(prev => ({...prev, currScore: prev.currScore + 1}));
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
                    (images.length > 0) ? images.slice(0,10).map(link => (
                        <img src={cleanImageURL(link)} className="card" onClick={(e)=>{checkImage(e,link)}} onError={()=>{handleImageError(link,images,setImage)}} key={"image"+link}/>
                    )) : <p>No images found</p>
                }
            </div>
        </div>
    )
}

export default App