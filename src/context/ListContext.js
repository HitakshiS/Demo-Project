import React, { useReducer } from 'react';

const ListContext  = React.createContext();

const listReducer = (state , action) => {
    switch(action.type){
        case 'add_list':
            return [...state, {title :`Item #${state.length +1}`}];
        default:
            return state;
    }
};

export const ListProvider = ({children}) => {
    const [list, dispatch] = useReducer(listReducer,[]);

    const addList = () => {
        dispatch({type: 'add_list'});
    };



    return (
        <ListContext.Provider value={{data : list, addList}}>
            {children}
        </ListContext.Provider>
    );
};

export default ListContext;