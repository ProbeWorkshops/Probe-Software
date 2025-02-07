import React, { useState } from 'react';
import axios from 'axios';
import "./landing.css";
import Navbar from './Navbar';

function Home() {
    const [userImage, setUserImage] = useState(null);
    const [dressImage, setDressImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleUserImageChange = (e) => {
        setUserImage(e.target.files[0]);
    };

    const handleDressImageChange = (e) => {
        setDressImage(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!userImage || !dressImage) {
            alert("Please upload both images.");
            return;
        }
    
        const formData = new FormData();
        formData.append("user_id", "1");
        formData.append("person_image", userImage);
        formData.append("dress_image", dressImage);
    
        try {
            setUploading(true);
            const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                responseType: "blob"  // Ensure response is treated as a file
            });
    
            setUploading(false);
    
            if (response.status === 200) {
                console.log(response.data);
                const imageURL = URL.createObjectURL(response.data);
                window.open(imageURL, "_blank");  // Open image in a new tab
            } else {
                alert("Failed to upload images. Please try again.");
            }
        } catch (error) {
            setUploading(false);
            alert("An error occurred. Please try again.");
        }
    };
    

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!userImage || !dressImage) {
    //         alert("Please upload both images.");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("user_id", "1"); 
    //     formData.append("person_image", userImage);
    //     formData.append("dress_image", dressImage);

    //     try {
    //         setUploading(true);
    //         const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
    //             headers: { "Content-Type": "multipart/form-data" },
    //         });

    //         setUploading(false);

    //         if (response.status === 201) {
    //             console.log(response.data)
    //             alert("Images uploaded successfully!");
    //         } else {
    //             alert("Failed to upload images. Please try again.");
    //         }
    //     } catch (error) {
    //         setUploading(false);
    //         alert("An error occurred. Please try again.");
    //     }
    // };

    return (
        <div className='landingParent'>
            <Navbar />
            <div className="container">
                <h1>Upload Your Images</h1>
                
                {/* Upload Sections */}
                <div className="upload-sections">
                    
                    {/* Human Image Upload */}
                    <div className="upload-box">
                        <label>Upload Your Image (Human Image):</label>
                        <input type="file" accept="image/*" onChange={handleUserImageChange} required />
                        <div className="image-preview">
                            {userImage && <img src={URL.createObjectURL(userImage)} alt="User Preview" />}
                        </div>
                    </div>

                    {/* Dress Image Upload */}
                    <div className="upload-box">
                        <label>Upload Dress Image:</label>
                        <input type="file" accept="image/*" onChange={handleDressImageChange} required />
                        <div className="image-preview">
                            {dressImage && <img src={URL.createObjectURL(dressImage)} alt="Dress Preview" />}
                        </div>
                    </div>

                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-button" onClick={handleSubmit} disabled={uploading}>
                    {uploading ? "Uploading..." : "Submit"}
                </button>
            </div>
        </div>
    );
}

export default Home;
