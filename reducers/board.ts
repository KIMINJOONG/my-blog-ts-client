import produce from "immer";

export const initialState = {
  board: null,
  boards: [],
  countByToday: {},
};

// 비동기 요청
export const BOARD_DETAIL_REQUEST = "BOARD_DETAIL_REQUEST";
export const BOARD_DETAIL_SUCCESS = "BOARD_DETAIL_SUCCESS";
export const BOARD_DETAIL_FAILURE = "BOARD_DETAIL_FAILURE";

export const LOAD_BOARDS_REQUEST = "LOAD_BOARDS_REQUEST";
export const LOAD_BOARDS_SUCCESS = "LOAD_BOARDS_SUCCESS";
export const LOAD_BOARDS_FAILURE = "LOAD_BOARDS_FAILURE";

export const LOAD_COUNT_BY_TODAY_REQUEST = "LOAD_COUNT_BY_TODAY_REQUEST";
export const LOAD_COUNT_BY_TODAY_SUCCESS = "LOAD_COUNT_BY_TODAY_SUCCESS";
export const LOAD_COUNT_BY_TODAY_FAILURE = "LOAD_COUNT_BY_TODAY_FAILURE";

interface IBOARD_DETAIL_REQUEST {
  type: typeof BOARD_DETAIL_REQUEST;
}

interface IBOARD_DETAIL_SUCCESS {
  type: typeof BOARD_DETAIL_SUCCESS;
  board: any;
  data: any;
}

interface IBOARD_DETAIL_FAILURE {
  type: typeof BOARD_DETAIL_FAILURE;
}

interface ILOAD_BOARDS_REQUEST {
  type: typeof LOAD_BOARDS_REQUEST;
}

interface ILOAD_BOARDS_SUCCESS {
  type: typeof LOAD_BOARDS_SUCCESS;
  boards: any;
  data: any;
}

interface ILOAD_BOARDS_FAILURE {
  type: typeof LOAD_BOARDS_FAILURE;
}

interface ILOAD_COUNT_BY_TODAY_REUQEST {
  type: typeof LOAD_COUNT_BY_TODAY_REQUEST;
}

interface ILOAD_COUNT_BY_TODAY_SUCCESS {
  type: typeof LOAD_COUNT_BY_TODAY_SUCCESS;
  data: any;
}

interface ILOAD_COUNT_BY_TODAY_FAILURE {
  type: typeof LOAD_COUNT_BY_TODAY_FAILURE;
}

export type BoardActionType =
  | IBOARD_DETAIL_REQUEST
  | IBOARD_DETAIL_SUCCESS
  | IBOARD_DETAIL_FAILURE
  | ILOAD_BOARDS_REQUEST
  | ILOAD_BOARDS_SUCCESS
  | ILOAD_BOARDS_FAILURE
  | ILOAD_COUNT_BY_TODAY_REUQEST
  | ILOAD_COUNT_BY_TODAY_SUCCESS
  | ILOAD_COUNT_BY_TODAY_FAILURE;

// 동기요청

// 동적인 데이터는 함수로 만들어줌 signup.js도 참고할것

const reducer = (state = initialState, action: BoardActionType) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case BOARD_DETAIL_REQUEST: {
        return {
          ...state,
        };
      }
      case BOARD_DETAIL_SUCCESS: {
        return {
          ...state,
          board: action.data,
        };
      }
      case BOARD_DETAIL_FAILURE: {
        return {
          ...state,
        };
      }
      case LOAD_BOARDS_REQUEST: {
        return {
          ...state,
        };
      }
      case LOAD_BOARDS_SUCCESS: {
        return {
          ...state,
          boards: action.data,
        };
      }
      case LOAD_BOARDS_FAILURE: {
        return {
          ...state,
        };
      }

      case LOAD_COUNT_BY_TODAY_REQUEST: {
        return {
          ...state,
        };
      }

      case LOAD_COUNT_BY_TODAY_SUCCESS: {
        return {
          ...state,
          countByToday: action.data,
        };
      }
      case LOAD_COUNT_BY_TODAY_FAILURE: {
        return {
          ...state,
        };
      }
      default: {
        return {
          ...state,
        };
      }
    }
  });
};

export default reducer;
