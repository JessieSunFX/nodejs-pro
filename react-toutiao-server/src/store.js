import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';


const toutiaoProcessor = (state, action) => {
    console.log('i got an dispatch:::', action);
    if(action.type === 'PUSH_LIST') {
        return {
            ...state,
            list: state.list.concat(action.data)
        };
    }
    return state;
};

const reduxPromise = ({dispatch, getState}) => next => action => {//？如果再次返回promise呢
    console.log('reduxPromise::::', action, next);
    if (typeof action.then === 'function') {
        return action.then(next);
        // return action(next); 模拟redux-thunk 
    }
    return next(action);
};

// 如果想解决全局变量，最好的方式就是依赖注入；你依赖的东西通过某种形式注进来，被人给你，而不是你自己从全局上拿；
export default (initState = {list: []}) => {
    return createStore(toutiaoProcessor, initState, applyMiddleware(thunkMiddleware));
};
// const store = createStore(toutiaoProcessor, applyMiddleware(reduxPromise));


// export default store;