const tokenReducer = (store = false, { type }) => {
  switch (type) {
    case 'TOKEN_APPROVED_TRUE':
      return true;
    case 'TOKEN_APPROVED_FALSE':
      return false;
    default:
      return store;
  }
};

export default tokenReducer;
