import React, { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPhotos,
  loadMorePhotos,
  finishLoadingMorePhotos,
} from "../slices/photosSlice";
import PhotoCard from "../components/PhotoCard";
import PhotoPopup from "../components/PhotoPopup";
import { Grid, CircularProgress, Typography } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();
  const { displayedPhotos, loading, error, currentPage, allPhotos } =
    useSelector((state) => state.photos);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (allPhotos.length === 0) {
      dispatch(fetchPhotos());
    }
  }, [dispatch, allPhotos.length]);

  const handleIntersection = useCallback(() => {
    if (!loading && currentPage * 50 < allPhotos.length) {
      dispatch(loadMorePhotos());
      setTimeout(() => {
        dispatch(finishLoadingMorePhotos());
      }, 2000);
    }
  }, [dispatch, loading, currentPage, allPhotos.length]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleIntersection();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleIntersection]);

  return (
    <div style={{ padding: "16px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        High-Quality Photo Gallery
      </Typography>
      <Grid container spacing={0}>
        {displayedPhotos.map((photo) => (
          <Grid item key={photo.id} xs={12} sm={6} md={3}>
            <PhotoCard photo={photo} />
          </Grid>
        ))}
      </Grid>
      {loading && (
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <CircularProgress />
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginTop: "8px" }}
          >
            Loading photos...
          </Typography>
        </div>
      )}
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      )}
      <div ref={loaderRef} style={{ height: "1px" }}></div>
      <PhotoPopup />
    </div>
  );
};

export default App;
