import React, { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Slideshow.css'

const Slideshow = ({ isOpen, image, toggle }) => {
    return (
        <div>
            <Modal isOpen={isOpen} image={image} toggle={toggle}>
                <img className="slide" src={image.node.secure_url}></img>
            </Modal>
        </div>
    )
}

export default Slideshow;