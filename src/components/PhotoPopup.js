import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPopupPhoto } from "../slices/photosSlice";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PhotoPopup = () => {
  const dispatch = useDispatch();
  const popupPhoto = useSelector((state) => state.photos.popupPhoto);

  if (!popupPhoto) return null;

  return (
    <Dialog open onClose={() => dispatch(setPopupPhoto(null))}>
      <DialogTitle>
        {popupPhoto.title}
        <IconButton
          onClick={() => dispatch(setPopupPhoto(null))}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <img
          src={popupPhoto.url}
          alt={popupPhoto.title}
          style={{ width: "100%" }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PhotoPopup;
