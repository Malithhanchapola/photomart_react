import React, { useState, Component } from "react";
import { Grid, CircularProgress } from "@mui/material";
import "./PortfolioScreen.css";
import { storage } from "../../../Firebase/firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { createPortfolio } from "../../../actions/portfolios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function PortfolioScreen() {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [portfolioData, setPortfolioData] = useState({
    photographerId: "",
    location: "",
    albumName: "",
    sourceUrls: [],
  });
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImageChange = (index) => (event) => {
    const newImages = [...images];
    newImages[index] = event.target.files[0];
    setImages(newImages);
  };

  const handleRemoveImage = (index) => () => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const handelFireBaseUpload = () => {
    setIsLoding(true);
    images?.map((element) => {
      const storageRef = ref(
        storage,
        `/images/${profile.photographerId}/${portfolioData.location}/${portfolioData.albumName}/${element.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, element);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          console.log(snapShot);
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((fireBaseUrl) => {
            setImageUrls((preUrls) => [...preUrls, fireBaseUrl]);
          });
        }
      );
    });
  };

  useEffect(() => {
    if (
      imageUrls.length === images.length &&
      imageUrls.length > 0 &&
      images.length > 0
    ) {
      dispatch(
        createPortfolio(
          {
            ...portfolioData,
            photographerId: profile.photographerId,
            sourceUrls: imageUrls,
          },
          navigate
        )
      );
      setIsLoding(false);
    }
  }, [imageUrls]);

  const handelSubmit = (e) => {
    e.preventDefault();
    handelFireBaseUpload();
  };

  return (
    <div>
      <div className="cards-container">
        <Grid
          container
          key={profile.photographerId}
          direction="row"
          justifyContent="space-between"
        >
          {Array(5)
            .fill()
            .map((_, index) => (
              <Grid key={index} item xs={2}>
                <div key={index} className="container">
                  {!images[index] ? (
                    <>
                      <label htmlFor={`file-input-${index}`}>
                        {`Choose a file`}
                        <input
                          id={`file-input-${index}`}
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange(index)}
                          style={{ display: "none" }}
                        />
                      </label>
                    </>
                  ) : (
                    <>
                      <img
                        src={URL.createObjectURL(images[index])}
                        alt="Selected Image"
                        className="image"
                        onClick={handleRemoveImage(index)}
                      />
                      {/* <button onClick={handleRemoveImage(index)}>Remove</button> */}
                    </>
                  )}
                </div>
              </Grid>
            ))}
        </Grid>
      </div>

      <div>
        <form onSubmit={handelSubmit}>
          <div className="inputfield-container">
            <div className="input-group">
              <label>Title</label>
              <input
                onChange={(e) =>
                  setPortfolioData({
                    ...portfolioData,
                    albumName: e.target.value,
                  })
                }
                type="text"
                id="title"
              />
            </div>

            <div className="input-group">
              <label>Discription</label>
              <input
                onChange={(e) =>
                  setPortfolioData({
                    ...portfolioData,
                    location: e.target.value,
                  })
                }
                type="text"
                id="discription"
              />
            </div>
          </div>

          {isLoding ? (
            <CircularProgress />
          ) : (
            <button type="submit" className="add-btn">
              Add
            </button>
          )}
          {/* 
          <button type="submit" className="add-btn">
            Add
          </button> */}
        </form>
      </div>
    </div>
  );
}

// export default PortfolioScreen;
