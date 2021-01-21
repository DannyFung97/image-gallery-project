import React, { useState } from "react"
// import Slideshow from "./Slideshow.js"
import useGallery from "../hooks/useGallery"
import $ from "jquery";
import "./Gallery.css"
import './Slideshow.css'

const Gallery = () => {
    const images = useGallery()
    const [imageIndex, setImageIndex] = useState(0);

    var isDragging = false;
    var imageScale = 1;
    var initialDragX;
    var initialDragY;
    var currDragX = 0;
    var currDragY = 0;
    var offSetDragX = 0;
    var offSetDragY = 0;

    if (typeof window !== `undefined`) {
        window.addEventListener('mousedown', e => {
            e.preventDefault();
            initialDragX = e.clientX - offSetDragX;
            initialDragY = e.clientY - offSetDragY;
            if (e.target == document.getElementById('img-on-display')) {
                document.getElementById('img-on-display').style.transition = 'none';
                if (imageScale != 1) {
                    isDragging = true;
                }
            }
            if (e.target == document.getElementById('myModal') || e.target == document.getElementById('img-container')) {
                document.getElementById('myModal').style.display = "none";
                document.getElementsByTagName("BODY")[0].classList.remove("modal-open");
                imageScale = 1;
                document.getElementById('img-on-display').style.transform = `scale(1)`
            }
        });

        window.addEventListener('mousemove', e => {
            if (isDragging) {
                e.preventDefault();
                var img = document.getElementById('img-on-display')
                currDragX = (e.clientX - initialDragX)
                currDragY = (e.clientY - initialDragY)
                offSetDragX = currDragX;
                offSetDragY = currDragY;
                console.log(currDragX, currDragY)
                img.style.transform = "translate3d(" + currDragX + "px, " + currDragY + "px, 0) scale(" + imageScale + ")";
            }
        });

        window.addEventListener('mouseup', e => {
            initialDragX = currDragX;
            initialDragY = currDragY;
            isDragging = false;
        });

        window.addEventListener('mouseleave', e => {
            isDragging = false;
        });
    }

    const fullImage = i => {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        setImageIndex(i);
        document.getElementsByTagName("BODY")[0].classList.add("modal-open");
    }

    const zoom = zoomIn => {
        var img = document.getElementById('img-on-display');
        var zoomLimit = 3;
        if (zoomIn && (Math.log2(imageScale * 2) <= zoomLimit)) {
            imageScale *= 2;
            img.style.transition = '0.2s ease';
            img.style.transform = `translate3d(${currDragX}px, ${currDragY}px, 0) scale(${imageScale})`
        }
        else if (!zoomIn && (imageScale / 2 >= 1)) {
            imageScale /= 2;
            img.style.transition = '0.2s ease';
            if (imageScale == 1) {
                img.style.transform = `scale(${imageScale})`
            }
            else {
                img.style.transform = `translate3d(${currDragX}px, ${currDragY}px, 0) scale(${imageScale})`
            }
        }
    }

    const slideNav = goNext => {
        var img = document.getElementById('img-on-display');
        img.style.transition = 'none';
        imageScale = 1;
        img.style.transform = `scale(1)`
        if (goNext && imageIndex + 1 < images.length) {
            setImageIndex(imageIndex + 1)
        }
        else if (!goNext && imageIndex - 1 >= 0) {
            setImageIndex(imageIndex - 1)
        }
    }

    return (
        <div>
            <div id="myModal" className="modal">
                <div className="img-container" id="img-container">
                    <img id="img-on-display" src={images[imageIndex].node.secure_url} />
                </div>
                <div className="slideshow-options">
                    <span className="prev">
                        <span className="nav-button" onClick={() => slideNav(false)}>
                            <span className="arrow" />
                        </span>
                        <span className="tooltiptext h-tooltip" id="tooltipprev">Previous</span>
                    </span>
                    <span className="next">
                        <span className="nav-button" onClick={() => slideNav(true)}>
                            <span className="arrow" />
                        </span>
                        <span className="tooltiptext h-tooltip" id="tooltipnext">Next</span>
                    </span>
                    <div className="zoom-options">
                        <span className="zoom-out-button">
                            <span className="nav-button" onClick={() => zoom(false)}>
                                <span className="magnifying-glass">
                                    <span className="h-line" />
                                </span>
                            </span>
                            <span className="tooltiptext v-tooltip" id="tooltipzoomout">Zoom Out</span>
                        </span>
                        <span className="zoom-in-button">
                            <span className="nav-button" onClick={() => zoom(true)}>
                                <span className="magnifying-glass">
                                    <span className="h-line" />
                                    <span className="v-line" />
                                </span>
                            </span>
                            <span className="tooltiptext v-tooltip" id="tooltipzoomin">Zoom In</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="image-grid">
                {images.map((image, index) => (
                    <div className="image-item" key={`${index}-cl`}>
                        <div className="img-hover">
                            <img className="gallery-img" src={image.node.secure_url.replace('q_auto,f_auto', 'w_0.6,c_scale')} alt={"no alt :("} onClick={() => fullImage(index)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gallery;