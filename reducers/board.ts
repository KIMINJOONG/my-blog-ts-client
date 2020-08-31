import produce from "immer";

export const initialState = {
  board: null,
  boardDetailLoading: false,
  boardDetailDone: false,
  boardDetailError: null,
  boards: [],
  boardsLoading: false,
  boardsDone: false,
  boardsError: null,
  boardsForMain: [],
  boardsForMainLoading: false,
  boardsForMainDone: false,
  boardsForMainError: null,
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

export const LOAD_BOARDS_FOR_MAIN_REQUEST = "LOAD_BOARDS_FOR_MAIN_REQUEST";
export const LOAD_BOARDS_FOR_MAIN_SUCCESS = "LOAD_BOARDS_FOR_MAIN_SUCCESS";
export const LOAD_BOARDS_FOR_MAIN_FAILURE = "LOAD_BOARDS_FOR_MAIN_FAILURE";

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
  error: any;
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
  error: any;
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
  error: any;
}

interface ILOAD_BOARDS_FOR_MAIN_REQUEST {
  type: typeof LOAD_BOARDS_FOR_MAIN_REQUEST;
}

interface ILOAD_BOARDS_FOR_MAIN_SUCCESS {
  type: typeof LOAD_BOARDS_FOR_MAIN_SUCCESS;
  data: any;
}

interface ILOAD_BOARDS_FOR_MAIN_FAILURE {
  type: typeof LOAD_BOARDS_FOR_MAIN_FAILURE;
  error: any;
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
  | ILOAD_COUNT_BY_TODAY_FAILURE
  | ILOAD_BOARDS_FOR_MAIN_REQUEST
  | ILOAD_BOARDS_FOR_MAIN_SUCCESS
  | ILOAD_BOARDS_FOR_MAIN_FAILURE;

// 동기요청

// 동적인 데이터는 함수로 만들어줌 signup.js도 참고할것

const reducer = (state = initialState, action: BoardActionType) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case BOARD_DETAIL_REQUEST: {
        return {
          ...state,
          boardDetailLoading: true,
          boardDetailDone: false,
          boardDetailError: null,
        };
      }
      case BOARD_DETAIL_SUCCESS: {
        return {
          ...state,
          board: { ...action.data },
          boardDetailLoading: false,
          boardDetailDone: true,
        };
      }
      case BOARD_DETAIL_FAILURE: {
        return {
          ...state,
          boardDetailError: action.error,
          boardDetailLoading: false,
        };
      }
      case LOAD_BOARDS_REQUEST: {
        return {
          ...state,
          boardsLoading: true,
          boardsDone: false,
          boardsError: null,
        };
      }
      case LOAD_BOARDS_SUCCESS: {
        return {
          ...state,
          boards: action.data,
          boardsLoading: false,
          boardsDone: true,
        };
      }
      case LOAD_BOARDS_FAILURE: {
        return {
          ...state,
          boardsLoading: false,
          boardsError: action.error,
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

      case LOAD_BOARDS_FOR_MAIN_REQUEST: {
        return {
          ...state,
          boardsForMainLoading: true,
          boardsForMainDone: false,
          boardsForMainError: null,
        };
      }
      case LOAD_BOARDS_FOR_MAIN_SUCCESS: {
        const imgRegexPattern = /<img.*?src="(.*?)"+>/g;
        const styleRegexPattern = /style\s*=\s*"([^"]*)/g;
        for (let board of action.data.data) {
          const imgRegex = imgRegexPattern.exec(board.content);

          if (imgRegex) {
            const mainImg = imgRegex[0];
            const imgStyleRegex = styleRegexPattern.exec(mainImg);
            if (imgStyleRegex) {
              const styleValue = imgStyleRegex[1];
              board.mainImgStyleValue = styleValue;
            }

            board.mainImg = mainImg;
            board.shortContent = board.content.replace(/(<([^>]+)>)/gi, "");
            board.shortContent = board.shortContent.length > 60
              ? `${board.shortContent.substring(0, 60)}...`
              : board.shortContent;
          }
        }
        return {
          ...state,
          boardsForMain: action.data.data,
          boardsForMainLoading: false,
          boardsForMainDone: true,
        };
      }
      case LOAD_BOARDS_FOR_MAIN_FAILURE: {
        return {
          ...state,
          boardsForMainLoading: false,
          boardsForMainError: action.error,
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
