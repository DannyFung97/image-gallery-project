import React, { useState } from "react"
// import Slideshow from "./Slideshow.js"
import useGallery from "../hooks/useGallery"
import "./Gallery.css"
import './Slideshow.css'

const Gallery = () => {
    const images = useGallery()
    const [imageIndex, setImageIndex] = useState(0);

    const fullImage = i => {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        setImageIndex(i);
    }

    const slideNav = goNext => {
        if (goNext && imageIndex + 1 < images.length) {
            setImageIndex(imageIndex + 1)
        }
        else if (!goNext && imageIndex - 1 >= 0) {
            setImageIndex(imageIndex - 1)
        }
    }

    window.onclick = function (event) {
        var modal = document.getElementById('myModal');
        var imgContainer = document.getElementById('img-container');
        if (event.target == modal || event.target == imgContainer) {
            modal.style.display = "none";
        }
    }

    return (
        <div>
            <div id="myModal" className="modal">
                <div className="slideshow-options">
                    <span className="prev">
                        <span className="nav-button" onClick={() => slideNav(false)}>
                            <span className="arrow" />
                        </span>
                        <span className="tooltiptext" id="tooltipprev">Previous</span>
                    </span>
                    <span className="next">
                        <span className="nav-button" onClick={() => slideNav(true)}>
                            <span className="arrow" />
                        </span>
                        <span className="tooltiptext" id="tooltipnext">Next</span>
                    </span>
                </div>
                <div className="img-container" id="img-container">
                    <img id="img-on-display" src={images[imageIndex].node.secure_url} />
                </div>
            </div>
            <div className="image-grid">
                {images.map((image, index) => (
                    <div className="image-item" key={`${index}-cl`}>
                        <div className="img-hover">
                            <img className="gallery-img" src={image.node.secure_url} alt={"no alt :("} onClick={() => fullImage(index)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gallery;