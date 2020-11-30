import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const UseInput = () => {
    const dispatch = useDispatch();
    const change = useCallback((action: any,event : React.ChangeEvent<HTMLInputElement> | string) => {
        dispatch(action(event));
    }, [dispatch]);

    const selectChange = useCallback((action: any, value: string) => {
        dispatch(action(value));
    }, [dispatch]);
    return { change, selectChange };
};