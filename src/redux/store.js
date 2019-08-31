import { createStore } from 'redux'
import { reducers } from './reducers'

const initialState = {
    allDeliveries : [],
    deliveriesShow : [],
    navigation : {
        item1 : {
            text : '1 - Elegi tu delivery',
            active : true,
            enable : false,
            baseUrl : '/'
        },
        item2 : {
            text : '2 - Realiza tu pedido',
            active : false,
            enable : false,
            baseUrl : '/pedido/'
        },
        item3 : {
            text : '3 - Comprobá tus datos',
            active : false,
            enable : false,
            baseUrl : '/checkout/'
        }
    },
    cart : []
};

export const store = createStore(
    reducers, 
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store