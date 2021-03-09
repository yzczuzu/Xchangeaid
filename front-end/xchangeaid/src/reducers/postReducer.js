import {
  FETCH_ARTICLES,
  NEW_ARTICLE,
  EDIT_ARTICLES,
  FETCH_ACTIVITY,
  NEW_ACTIVITY,
  EDIT_ACTIVITY,
  CREATE_IMAGE,
} from "../actions/types";

const initialState = {
  articles: [],
  activities: [],
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case NEW_ARTICLE:
      return {
        ...state,
        item: action.payload,
      };
    case EDIT_ARTICLES:
      return {
        ...state,
        item: action.payload,
      };
      case CREATE_IMAGE:
        return {
          ...state,
          item: action.payload,
        };
    case FETCH_ACTIVITY:
      return {
        ...state,
        activities: action.payload,
      };
    case NEW_ACTIVITY:
      return {
        ...state,
        item: action.payload,
      };
    case EDIT_ACTIVITY:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
