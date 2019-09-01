import { createStore } from 'redux'
import { reducers } from './reducers'

const initialState = {
    allDeliveries : [],
    deliveriesShow : [],
    cart : [],
    lastLocal : null
};

export const store = createStore(
    reducers, 
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store