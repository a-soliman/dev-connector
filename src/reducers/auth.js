const initalState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initalState, action) => {
  switch (action.type) {

    case 'REGISTER':
      return {
        user: action.userData
      };

    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
