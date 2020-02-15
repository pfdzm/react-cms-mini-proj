import React, { createContext, useReducer, useContext } from "react";
// Don't forget to import all of your actions!
import {
  ADD_POST,
  REMOVE_POST,
  SAVING,
  SET_CURRENT_POST,
  FETCH_POSTS,
  ADD_FAVORITE,
  REMOVE_FAVORITE
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, isLoading: false, posts: action.payload };
    case ADD_POST:
      return {
        ...state,
        isLoading: false,
        posts: [...state.posts, action.payload]
      };
    case REMOVE_POST:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.filter(({ _id }) => _id !== action.payload._id)
      };
    case SET_CURRENT_POST:
      return { ...state, currentPost: action.payload };
    case SAVING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          ({ _id }) => _id !== action.payload._id
        )
      };
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    posts: [],
    currentPost: {},
    favorites: []
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
