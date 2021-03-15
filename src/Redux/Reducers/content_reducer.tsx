import { ThunkAction } from "redux-thunk";

const STEP = "STEP";
const AUTH = "AUTH";
const ACT = "ACT";

interface refreshType {
  type: typeof STEP;
  step: number;
}

interface authType {
  type: typeof AUTH;
  isAuth: boolean;
  token: string | null;
}

interface exampleType {
  type: typeof ACT;
  act: string;
}

type actionTypes = refreshType | authType | exampleType;

enum resultCode {
  Succes = 0,
  Error = 1,
}

export interface initialStateType {
  isAuth: boolean;
  token: string | null;
  step: number;
  resCode: resultCode;
  example: string | null;
}

let initialState: initialStateType = {
  isAuth: false,
  token: null,
  step: 0,
  resCode: resultCode.Succes,
  example: null,
};

const contentReducer = (
  state = initialState,
  action: actionTypes
): initialStateType => {
  switch (action.type) {
    case STEP: {
      return {
        ...state,
        step: action.step,
      };
    }
    case AUTH: {
      return {
        ...state,
        isAuth: action.isAuth,
        token: action.token,
      };
    }
    case ACT: {
      return {
        ...state,
        example: action.act,
      };
    }
    default:
      return state;
  }
};

export let refreshContent = (step: number): refreshType => ({
  type: STEP,
  step: step,
});

export let authInfo = (isAuth: boolean, token: string | null): authType => ({
  type: AUTH,
  isAuth: isAuth,
  token: token,
});

type thunkType = ThunkAction<void, typeof initialState, unknown, refreshType>;

export const setContent = (num: number): thunkType => {
  return (dispatch, getState) => {
    // getState()
    dispatch(refreshContent(num));
  };
};

type thunkAuthType = ThunkAction<void, typeof initialState, unknown, authType>;

export const setAuthInfo = (
  isAuth: boolean,
  token: string | null
): thunkAuthType => {
  return (dispatch) => {
    dispatch(authInfo(isAuth, token));
  };
};

export default contentReducer;
