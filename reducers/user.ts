import produce from "immer";
import jsCookie from "js-cookie";
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
  joinUserLoading: false,
  joinUserDone: false,
  joinUserError: null,
  joinUser: null,
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

export const JOIN_USER_REQUEST = "JOIN_USER_REQUEST";
export const JOIN_USER_SUCCESS = "JOIN_USER_SUCCESS";
export const JOIN_USER_FAILURE = "JOIN_USER_FAILURE";

export interface IJOIN_USER_REQUEST {
  type: typeof JOIN_USER_REQUEST;
  data: {
    email: string;
    password: string;
    nickname: string;
  };
}

export interface IJOIN_USER_SUCCESS {
  type: typeof JOIN_USER_SUCCESS;
  data: any;
}

export interface IJOIN_USER_FAILURE {
  type: typeof JOIN_USER_FAILURE;
  error: any;
}

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
  | ILOG_IN_FAILURE
  | IJOIN_USER_REQUEST
  | IJOIN_USER_SUCCESS
  | IJOIN_USER_FAILURE;

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

export const joinRequestAction = (data: any) => {
  return {
    type: JOIN_USER_REQUEST,
    data,
  };
};

// 동적인 데이터는 함수로 만들어줌 signup.js도 참고할것

const reducer = (state = initialState, action: UserActionType) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case JOIN_USER_REQUEST: {
        draft.joinUserLoading = true;
        draft.joinUserDone = false;
        draft.joinUserError = null;
        break;
      }
      case JOIN_USER_SUCCESS: {
        draft.joinUserLoading = false;
        draft.joinUserDone = true;
        draft.joinUser = action.data;
        break;
      }
      case JOIN_USER_FAILURE: {
        draft.joinUserLoading = false;
        draft.joinUserError = action.error;
        break;
      }
      case LOG_IN_REQUEST: {
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      }
      case LOG_IN_SUCCESS: {
        jsCookie.set("token", action.data.data.token);
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
