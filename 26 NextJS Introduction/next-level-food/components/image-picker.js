"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import styles from "@comp/image-picker.module.css";

const ImagePicker = ({ label, name }) => {
    const inputRef = useRef();
    const [pickedImage, setPickedImage] = useState();

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    };

    return (
        <div className={styles.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={styles.controls}>
                <div className={styles.preview}>
                    {!pickedImage && <p>No image selected yet!</p>}
                    {pickedImage && <Image src={pickedImage} alt="The image selected by the user." fill />}
                </div>
                <input
                    ref={inputRef}
                    type="file"
                    id={name}
                    name={name}
                    accept="image/png, image/jpeg"
                    className={styles.input}
                    onChange={handleImageChange}
                    required
                />
                <button className={styles.button} type="button" onClick={handleClick}>
                    Pick an image
                </button>
            </div>
        </div>
    );
};

export default ImagePicker;
