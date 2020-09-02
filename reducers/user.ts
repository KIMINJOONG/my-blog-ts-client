import produce from "immer";
import {} from "./user";
export const initialState = {
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

// 비동기 요청
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE";

export interface ILOG_IN_REQUEST {
  type: typeof LOG_IN_REQUEST;
  data: {
    eamil: string;
    password: string;
  };
}

export interface ILOG_IN_SUCCESS {
  type: typeof LOG_IN_SUCCESS;
  data: any;
}

export interface ILOG_IN_FAILURE {
  type: typeof LOG_IN_FAILURE;
  error: any;
}

interface ILOGOUT_USER_REQUEST {
  type: typeof LOGOUT_USER_REQUEST;
}

interface ILOGOUT_USER_SUCCESS {
  type: typeof LOGOUT_USER_SUCCESS;
}

interface ILOGOUT_USER_FAILURE {
  type: typeof LOGOUT_USER_FAILURE;
  error: any;
}

interface ILOAD_USER_REQUEST {
  type: typeof LOAD_USER_REQUEST;
}

interface ILOAD_USER_SUCCESS {
  type: typeof LOAD_USER_SUCCESS;
  me: any;
  data: {
    name: string;
    email: string;
    password: string;
    role: number;
    token: string;
    tokenExp: string;
    boards: any;
    comments: any;
  };
}

interface ILOAD_USER_FAILURE {
  type: typeof LOAD_USER_FAILURE;
  error: any;
}

export type UserActionType =
  | ILOAD_USER_REQUEST
  | ILOAD_USER_SUCCESS
  | ILOAD_USER_FAILURE
  | ILOGOUT_USER_REQUEST
  | ILOGOUT_USER_SUCCESS
  | ILOGOUT_USER_FAILURE
  | ILOG_IN_REQUEST
  | ILOG_IN_SUCCESS
  | ILOG_IN_FAILURE;

// 동기요청

export const loadUserAction = (data: any) => {
  return {
    type: LOAD_USER_REQUEST,
    data: data,
  };
};

export interface ILOG_IN_REQUEST_ACTION {
  data: {
    email: string;
    password: string;
  };
}

export const loginRequestAction = (data: ILOG_IN_REQUEST_ACTION) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequestAction = (data: any) => {
  return {
    type: LOGOUT_USER_REQUEST,
    data,
  };
};

// 동적인 데이터는 함수로 만들어줌 signup.js도 참고할것

const reducer = (state = initialState, action: UserActionType) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST: {
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data.data;
        break;
      }
      case LOG_IN_FAILURE: {
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      }
      case LOAD_USER_REQUEST: {
        draft.loadUserLoading = true;
        draft.loadUserDone = false;
        draft.loadUserError = null;
        break;
      }
      case LOAD_USER_SUCCESS: {
        draft.me = action.data as any;
        draft.loadUserLoading = false;
        draft.loadUserDone = true;
        break;
      }
      case LOAD_USER_FAILURE: {
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;
      }
      case LOGOUT_USER_REQUEST: {
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      }
      case LOGOUT_USER_SUCCESS: {
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      }
      case LOGOUT_USER_FAILURE: {
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      }
      default: {
        break;
      }
    }
  });
};

export default reducer;
