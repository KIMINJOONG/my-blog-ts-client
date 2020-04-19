import { createContext } from "react";

const init: any = {
    me: {},
};

const UserStore = createContext(init);

export default UserStore;
