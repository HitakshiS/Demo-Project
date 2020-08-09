import ActionTypes from "../Store/ActionType";

const INITIAL_STATE = {
    listData: [{
        id: 1,
        title: "Software Engineer",
        description: "Innovative software developer with expertise in React Native and android mobile application development."
    },
    {
        id: 2,
        title: "Skills",
        description: "React Native, Android Redux, JavaScript, Java, ES6, JSON, Data Structures, CSS3, HTML5, Git, SQLite, SAP and React JS"
    }, {
        id: 3,
        title: "Intrests",
        description: "Badminton, Drawing, Travelling and Basketball"

    },
    ]
};

export default (Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ITEM: {
            return {
                ...state,
                listData: [...state.listData, { id: state.listData.length + 1, title: action.payload.title, description: action.payload.description }]
            };
        }
        // case ActionTypes.GET_LIST: {
        //     return {
        //         ...state,
        //         listData: [...state.listData]
        //     };
        // }
        default:
            return state;
    }
});