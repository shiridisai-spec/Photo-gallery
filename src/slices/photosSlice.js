import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPhotos = createAsyncThunk("photos/fetchPhotos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  const data = await response.json();
  return data;
});

const photosSlice = createSlice({
  name: "photos",
  initialState: {
    allPhotos: [],
    displayedPhotos: [],
    currentPage: 0,
    photosPerPage: 50,
    loading: false,
    error: null,
    likedPhotos: {},
    popupPhoto: null,
  },
  reducers: {
    loadMorePhotos: (state) => {
      state.loading = true;
    },
    finishLoadingMorePhotos: (state) => {
      const { currentPage, photosPerPage, allPhotos } = state;
      const start = currentPage * photosPerPage;
      const end = start + photosPerPage;
      const newPhotos = allPhotos.slice(start, end);

      state.displayedPhotos = [...state.displayedPhotos, ...newPhotos];
      state.currentPage += 1;
      state.loading = false;
    },
    toggleLike: (state, action) => {
      const photoId = action.payload;
      if (state.likedPhotos[photoId]) {
        delete state.likedPhotos[photoId];
      } else {
        state.likedPhotos[photoId] = true;
      }
    },
    setPopupPhoto: (state, action) => {
      state.popupPhoto = action.payload;
    },
    closePopup: (state) => {
      state.popupPhoto = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.allPhotos = action.payload;
        state.loading = false;

        const { photosPerPage } = state;
        state.displayedPhotos = action.payload.slice(0, photosPerPage);
        state.currentPage = 1;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  loadMorePhotos,
  finishLoadingMorePhotos,
  toggleLike,
  setPopupPhoto,
  closePopup,
} = photosSlice.actions;

export default photosSlice.reducer;
