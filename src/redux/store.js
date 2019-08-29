import { createStore } from 'redux'
import { deliveries } from './reducers'

const initialState = {
    allDeliveries : [],
    deliveriesShow : []
};

export const store = createStore(
    deliveries, 
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store