import * as actionTypes from './types';

const initialState = {
    queue: [],
    current: null
};

export const reducer = (state = initialState, {type, data}) => {
    switch (type) {
        case actionTypes.ADD_NOTIFICATION: {
            const queue = state.queue.concat([data]);
            return {...state, queue, current: !state.current ? queue[0] : state.current};
        }
        case actionTypes.HIDE_NOTIFICATION: {
            return {...state, current: {hide: true, ...state.current}};
        }
        case actionTypes.REMOVE_NOTIFICATION: {
            //const queue = state.queue.slice(1);
            //const nextNotification = queue[0];
            //return { ...state, queue: queue, current: nextNotification };
            return {...state, queue: [], current: null};
        }
        default:
            return state;
    }
};

export default reducer;
