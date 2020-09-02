const INITIAL_STATE = {
  current: null,
  token: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, token: null, error: null };
    case "LOGIN_FAILURE":
      return { ...state, token: null, error: "An unknown error occured" };
    case "LOGIN_SUCCESS":
      return { ...state, token: action.token, error: null };
    case "CURRENT_USER_SUCCESS":
      return { ...state, current: action.current };

    default:
      return state;
  }
};

export default userReducer;
