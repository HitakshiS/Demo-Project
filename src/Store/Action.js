import ActionTypes from "../Store/ActionType";

export const addItem = (title, description) => {
    console.log("add item called");
    return {
        type: ActionTypes.ADD_ITEM,
        payload: { title, description }
    };
};
export const getList = () => {
    return {
        type: ActionTypes.GET_LIST,
    };
};