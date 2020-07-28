import produce from "immer";

export const initialState = {
    me: null, // 내 정보
};

// 비동기 요청
export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

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
}

export type UserActionType =
    | ILOAD_USER_REQUEST
    | ILOAD_USER_SUCCESS
    | ILOAD_USER_FAILURE;

// 동기요청

// 동적인 데이터는 함수로 만들어줌 signup.js도 참고할것

const reducer = (state = initialState, action: UserActionType) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOAD_USER_REQUEST: {
                return {
                    ...state,
                };
            }
            case LOAD_USER_SUCCESS: {
                if (action.me) {
                    return {
                        ...state,
                        me: action.data,
                    };
                }
                return {
                    ...state,
                    userInfo: action.data,
                };
            }
            case LOAD_USER_FAILURE: {
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
