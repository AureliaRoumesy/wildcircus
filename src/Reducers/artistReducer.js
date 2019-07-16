const artistReducer = (store = { updateArtist: [], newArtist: [] }, action) => {
  switch (action.type) {
    // case 'UPDATE_ARTIST': {
    //   const newstore = { ...store };
    //   newstore.updateArtist = action.payload;
    //   return newstore;
    // }
    case 'NEW_ARTIST': {
      const newstores = { ...store };
      newstores.newArtist = action.payload;
      return newstores;
    }
    default:
      return store;
  }
};

export default artistReducer;
