import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike, setPopupPhoto } from "../slices/photosSlice";
import { Card, CardContent, CardActions, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const PhotoCard = ({ photo }) => {
  const dispatch = useDispatch();
  const likedPhotos = useSelector((state) => state.photos.likedPhotos);
  const isLiked = !!likedPhotos[photo.id];

  const handleLike = () => {
    dispatch(toggleLike(photo.id));
  };

  const handleOpenPopup = () => {
    dispatch(setPopupPhoto(photo));
  };

  return (
    <Card
      style={{ borderRadius: "8px", overflow: "hidden", cursor: "pointer" }}
    >
      <img
        src={photo.url}
        alt={photo.title}
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        onClick={handleOpenPopup}
      />
      <CardContent>
        <div style={{ fontSize: "14px", fontWeight: 500, textAlign: "center" }}>
          {photo.title}
        </div>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          onClick={handleLike}
          color={isLiked ? "secondary" : "default"}
        >
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PhotoCard;
