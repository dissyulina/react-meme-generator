import React from "react";

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "./images/memeimg.png"
    });

    const [allMemeImages, setAllMemeImages] = React.useState([]);

    // Effect hook to fetch data from memes API
    React.useEffect(() => {
        console.log("Effect ran")
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemeImages(data.data.memes)) // only save the memes array
    }, [])

    // Get a random meme image
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemeImages.length)
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                randomImage: allMemeImages[randomNumber].url
            }
        })
    }

    // Function to handle change on text input boxes
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    onChange={handleChange}
                    value={meme.topText}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    onChange={handleChange}
                    value={meme.bottomText}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}
