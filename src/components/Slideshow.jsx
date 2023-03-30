import React, { useState, useEffect, useRef } from "react";
import { storage } from "../firebase-config";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
  getMetadata,
  deleteObject,
} from "firebase/storage";
import "react-slideshow-image/dist/styles.css";
import Carousel from "react-bootstrap/Carousel";
import "./Slideshow.css";
import ReactPlayer from "react-player";

function Slideshow() {
  const [getUrl, setGetUrl] = useState([]);
  const [index, setIndex] = useState(0);
  const [fileType, setFileType] = useState([]);
  const [videoIntervals, setVideoIntervals] = useState([]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    let isMounted = true;
    const storageRef = ref(storage, "files/");
    const urls = [];
    const types = [];

    const fetchData = async () => {
      const res = await listAll(storageRef);
      for (const itemRef of res.items) {
        const url = await getDownloadURL(
          ref(storage, itemRef._location.path)
        );
        urls.push(url);
        const metadata = await getMetadata(
          ref(storage, itemRef._location.path)
        );
        //console.log(metadata);
        types.push(metadata.contentType);
        //console.log(metadata.contentType);
        //console.log("Component: Slideshow");
      }
      if (isMounted) {
        setGetUrl(urls);
        setFileType(types);
        //console.log(getUrl);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="slideshow-container">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={
          fileType[index] === "video/mp4" ? videoIntervals[index] : 5000
        }
      >
        {getUrl.map((e, key) => {
          if (
            fileType[key] === "image/jpeg" ||
            fileType[key] === "image/jpg" ||
            fileType[key] === "image/png" ||
            fileType[key] === "image/svg" ||
            fileType[key] === "image/webp"
          ) {
            return (
              <Carousel.Item key={key} interval={5000}>
                <img
                  className="d-block mx-auto"
                  style={{ height: "720px", objectFit: "contain" }}
                  src={e}
                  alt={e}
                />
              </Carousel.Item>
            );
          } else {
            return (
              <Carousel.Item key={key} interval={videoIntervals[key]}>
                <ReactPlayer
                  url={e}
                  playing={true}
                  muted={true}
                  loop={true}
                  style={{
                    display: "block",
                    margin: "0 auto",
                    height: "720px",
                    objectFit: "contain"
                  }}
                  onD
                  onDuration={(duration) => {
                    console.log("duration"+duration)
                    const intervals = [...videoIntervals];
                    intervals[key] = duration * 1000;
                    setVideoIntervals(intervals);
                  }}
                />
              </Carousel.Item>
            );
          }
        })}
      </Carousel>
    </div>
  );
}

export default Slideshow;
