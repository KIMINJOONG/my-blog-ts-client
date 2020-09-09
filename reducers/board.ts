import produce from "immer";

export const initialState = {
  board: null as any,
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
  addBoardLoading: false,
  addBoardDone: false,
  addBoardError: null,
  updateBoardLoading: false,
  updateBoardDone: false,
  updateBoardError: null,
  removeBoardLoading: false,
  removeBoardDone: false,
  removeBoardError: null,
  loadCountByTodayLoading: false,
  loadCountByTodayDone: false,
  loadCountByTodayError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  commentsLoading: false,
  commentsDone: false,
  commentsError: null,
  addLikeLoading: false,
  addLikeDone: false,
  addLikeError: null,
  removeLikeLoading: false,
  removeLikeDone: false,
  removeLikeError: null,
};

// 비동기 요청
export const ADD_LIKE_REQUEST = "ADD_LIKE_REQUEST";
export const ADD_LIKE_SUCCESS = "ADD_LIKE_SUCCESS";
export const ADD_LIKE_FAILURE = "ADD_LIKE_FAILURE";

export const REMOVE_LIKE_REQUEST = "REMOVE_LIKE_REQUEST";
export const REMOVE_LIKE_SUCCESS = "REMOVE_LIKE_SUCCESS";
export const REMOVE_LIKE_FAILURE = "REMOVE_LIKE_FAILURE";

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

export const ADD_BOARD_REQUEST = "ADD_BOARD_REQUEST";
export const ADD_BOARD_SUCCESS = "ADD_BOARD_SUCCESS";
export const ADD_BOARD_FAILURE = "ADD_BOARD_FAILURE";

export const UPDATE_BOARD_REQUEST = "UPDATE_BOARD_REQUEST";
export const UPDATE_BOARD_SUCCESS = "UPDATE_BOARD_SUCCESS";
export const UPDATE_BOARD_FAILURE = "UPDATE_BOARD_FAILURE";

export const REMOVE_BOARD_REQUEST = "REMOVE_BOARD_REQUEST";
export const REMOVE_BOARD_SUCCESS = "REMOVE_BOARD_SUCCESS";
export const REMOVE_BOARD_FAILURE = "REMOVE_BOARD_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const LOAD_COMMENTS_REQUEST = "LOAD_COMMENTS_REQUEST";
export const LOAD_COMMENTS_SUCCESS = "LOAD_COMMENTS_SUCCESS";
export const LOAD_COMMENTS_FAILURE = "LOAD_COMMENTS_FAILURE";

export const addLikeAction = (data: any) => ({
  type: ADD_LIKE_REQUEST,
  data,
});

export const removeLikeAction = (data: any) => ({
  type: REMOVE_LIKE_REQUEST,
  data,
});

export const addBoardAction = (data: any) => ({
  type: ADD_BOARD_REQUEST,
  data,
});

export const updateBoardAction = (boardId: string, data: any) => ({
  type: UPDATE_BOARD_REQUEST,
  data,
  boardId,
});

export const removeBoardAction = (boardId: string) => ({
  type: REMOVE_BOARD_REQUEST,
  boardId,
});

export const addCommentAction = (boardId: string, data: any) => ({
  type: ADD_COMMENT_REQUEST,
  boardId,
  data,
});

interface IREMOVE_LIKE_REQUEST {
  type: typeof REMOVE_LIKE_REQUEST;
  data: any;
}

interface IREMOVE_LIKE_SUCCESS {
  type: typeof REMOVE_LIKE_SUCCESS;
  data: any;
}

interface IREMOVE_LIKE_FAILURE {
  type: typeof REMOVE_LIKE_FAILURE;
  error: any;
}

interface IADD_LIKE_REQUEST {
  type: typeof ADD_LIKE_REQUEST;
}

interface IADD_LIKE_SUCCESS {
  type: typeof ADD_LIKE_SUCCESS;
  data: any;
}

interface IADD_LIKE_FAILURE {
  type: typeof ADD_LIKE_FAILURE;
  error: any;
}

interface ILOAD_COMMENTS_REQUEST {
  type: typeof LOAD_COMMENTS_REQUEST;
}

interface ILOAD_COMMENTS_SUCCESS {
  type: typeof LOAD_COMMENTS_SUCCESS;
  data: any;
}

interface ILOAD_COMMENTS_FAILURE {
  type: typeof LOAD_COMMENTS_FAILURE;
  error: any;
}

interface IADD_COMMENT_REQUEST {
  type: typeof ADD_COMMENT_REQUEST;
}

interface IADD_COMMENT_SUCCESS {
  type: typeof ADD_COMMENT_SUCCESS;
  data: any;
}

interface IADD_COMMENT_FAILURE {
  type: typeof ADD_COMMENT_FAILURE;
  error: any;
}

interface IREMOVE_BOARD_REQUEST {
  type: typeof REMOVE_BOARD_REQUEST;
}

interface IREMOVE_BOARD_SUCCESS {
  type: typeof REMOVE_BOARD_SUCCESS;
  data: any;
}

interface IREMOVE_BOARD_FAILURE {
  type: typeof REMOVE_BOARD_FAILURE;
  error: any;
}

interface IUPDATE_BOARD_REQUEST {
  type: typeof UPDATE_BOARD_REQUEST;
}

interface IUPDATE_BOARD_SUCCESS {
  type: typeof UPDATE_BOARD_SUCCESS;
  data: any;
}

interface IUPDATE_BOARD_FAILURE {
  type: typeof UPDATE_BOARD_FAILURE;
  error: any;
}

interface IADD_BOARD_REQUEST {
  type: typeof ADD_BOARD_REQUEST;
}

interface IADD_BOARD_SUCCESS {
  type: typeof ADD_BOARD_SUCCESS;
  data: any;
}

interface IADD_BOARD_FAILURE {
  type: typeof ADD_BOARD_FAILURE;
  error: any;
}

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
  | ILOAD_BOARDS_FOR_MAIN_FAILURE
  | IADD_BOARD_REQUEST
  | IADD_BOARD_SUCCESS
  | IADD_BOARD_FAILURE
  | IUPDATE_BOARD_REQUEST
  | IUPDATE_BOARD_SUCCESS
  | IUPDATE_BOARD_FAILURE
  | IREMOVE_BOARD_REQUEST
  | IREMOVE_BOARD_SUCCESS
  | IREMOVE_BOARD_FAILURE
  | ILOAD_COMMENTS_REQUEST
  | ILOAD_COMMENTS_SUCCESS
  | ILOAD_COMMENTS_FAILURE
  | IADD_COMMENT_REQUEST
  | IADD_COMMENT_SUCCESS
  | IADD_COMMENT_FAILURE
  | IADD_LIKE_REQUEST
  | IADD_LIKE_SUCCESS
  | IADD_LIKE_FAILURE
  | IREMOVE_LIKE_REQUEST
  | IREMOVE_LIKE_SUCCESS
  | IREMOVE_LIKE_FAILURE;

// 동기요청

// 동적인 데이터는 함수로 만들어줌 signup.js도 참고할것

const reducer = (state = initialState, action: BoardActionType) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_LIKE_REQUEST: {
        draft.addLikeLoading = true;
        draft.addLikeDone = false;
        draft.addLikeError = null;
        break;
      }
      case ADD_LIKE_SUCCESS: {
        draft.addLikeLoading = false;
        draft.board.data.likes.unshift(action.data.data);
        draft.addLikeDone = true;
        break;
      }
      case ADD_LIKE_FAILURE: {
        draft.addLikeLoading = false;
        draft.addLikeError = action.error;
        break;
      }

      case REMOVE_LIKE_REQUEST: {
        draft.removeLikeLoading = true;
        draft.removeLikeDone = false;
        draft.removeLikeError = null;
        break;
      }

      case REMOVE_LIKE_SUCCESS: {
        draft.removeLikeLoading = false;
        draft.board.data.likes = draft.board.data.likes.filter((like: any) =>
          like.id !== action.data.data.id
        );
        draft.removeLikeDone = true;
        break;
      }
      case REMOVE_LIKE_FAILURE: {
        draft.removeLikeLoading = false;
        draft.removeLikeError = action.error;
        break;
      }
      case ADD_COMMENT_REQUEST: {
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      }
      case ADD_COMMENT_SUCCESS: {
        draft.board.data.comments.push(action.data.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE: {
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      }
      case REMOVE_BOARD_REQUEST: {
        draft.removeBoardLoading = true;
        draft.removeBoardDone = false;
        draft.removeBoardError = null;
        break;
      }
      case REMOVE_BOARD_SUCCESS: {
        draft.removeBoardLoading = false;
        draft.removeBoardDone = true;
        draft.board = action.data;
        break;
      }
      case REMOVE_BOARD_FAILURE: {
        draft.removeBoardLoading = false;
        draft.removeBoardError = action.error;
        break;
      }
      case UPDATE_BOARD_REQUEST: {
        draft.updateBoardLoading = true;
        draft.updateBoardDone = false;
        draft.updateBoardError = null;
        break;
      }
      case UPDATE_BOARD_SUCCESS: {
        draft.updateBoardLoading = false;
        draft.updateBoardDone = true;
        draft.board = action.data;
        break;
      }
      case UPDATE_BOARD_FAILURE: {
        draft.updateBoardLoading = false;
        draft.updateBoardError = action.error;
        break;
      }
      case ADD_BOARD_REQUEST: {
        draft.addBoardLoading = true;
        draft.addBoardDone = false;
        draft.addBoardError = null;
        break;
      }
      case ADD_BOARD_SUCCESS: {
        draft.addBoardLoading = false;
        draft.addBoardDone = true;
        draft.board = action.data;
        break;
      }
      case ADD_BOARD_FAILURE: {
        draft.addBoardLoading = false;
        draft.addBoardError = action.error;
        break;
      }
      case BOARD_DETAIL_REQUEST: {
        draft.boardDetailLoading = true;
        draft.boardDetailDone = false;
        draft.boardDetailError = null;
        break;
      }
      case BOARD_DETAIL_SUCCESS: {
        draft.boardDetailLoading = false;
        draft.boardDetailDone = true;
        draft.board = action.data;
        break;
      }
      case BOARD_DETAIL_FAILURE: {
        draft.boardDetailLoading = false;
        draft.boardDetailError = action.error;
        break;
      }
      case LOAD_BOARDS_REQUEST: {
        draft.boardsLoading = true;
        draft.boardsDone = false;
        draft.boardsError = null;
        break;
      }
      case LOAD_BOARDS_SUCCESS: {
        draft.boardsLoading = false;
        draft.boardsDone = true;
        draft.boards = action.data;
        break;
      }
      case LOAD_BOARDS_FAILURE: {
        draft.boardsLoading = false;
        draft.boardsError = action.error;
        break;
      }

      case LOAD_COUNT_BY_TODAY_REQUEST: {
        draft.loadCountByTodayLoading = true;
        draft.loadCountByTodayDone = false;
        draft.loadCountByTodayError = null;
        break;
      }

      case LOAD_COUNT_BY_TODAY_SUCCESS: {
        draft.loadCountByTodayLoading = false;
        draft.loadCountByTodayDone = true;
        draft.countByToday = action.data;
        break;
      }
      case LOAD_COUNT_BY_TODAY_FAILURE: {
        draft.loadCountByTodayLoading = false;
        draft.loadCountByTodayError = action.error;
        break;
      }

      case LOAD_BOARDS_FOR_MAIN_REQUEST: {
        draft.boardsForMainLoading = true;
        draft.boardsForMainDone = false;
        draft.boardsForMainError = null;
        break;
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
            board.shortContent = board.content.replace(
              /(<([^>]+)>)/gi,
              "",
            );
            board.shortContent = board.shortContent.length > 60
              ? `${board.shortContent.substring(0, 60)}...`
              : board.shortContent;
          }
        }
        draft.boardsForMainLoading = false;
        draft.boardsForMainDone = true;
        draft.boardsForMain = action.data.data;
        break;
      }
      case LOAD_BOARDS_FOR_MAIN_FAILURE: {
        draft.boardsForMainLoading = false;
        draft.boardsForMainError = action.error;
        break;
      }
      default: {
        break;
      }
    }
  });
};

export default reducer;
