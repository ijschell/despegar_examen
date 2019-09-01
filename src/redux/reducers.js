export const reducers = (state, action) => {

    if(action.component === 'deliveries'){

        state = handleDeliveries(state, action)

    }else if(action.component === 'cart'){

        state = handleCart(state, action)

    }

    return state;

}

const handleDeliveries = (state, action) => {
    switch (action.type) {
        
        case 'init_deliveries':

            return {...state, allDeliveries : action.value}

        break;

        case 'change_deliveries':

            var deliveriesFiltered = state.allDeliveries;

            if(action.where === 'name' || action.where === 'description'){

                // filter deliveries by Name or Description
                deliveriesFiltered = deliveriesFiltered.filter(item => {

                    let lower = item[action.where].toLowerCase();
                    let searching = action.value.toLowerCase();

                    if(searching !== ''){
                        if(lower.search(searching) != -1){
                            return item;
                        }
                    }else{
                        return item;
                    }

                })

            }
           
            return {...state, deliveriesShow : deliveriesFiltered}

        break;
        case 'set_default_deliveries_show':

            return {
                ...state,
                deliveriesShow : state.allDeliveries
            }

        break;
        case 'set_selected_prod':

            const local = action.local;
            const ID = parseInt(action.id);
            const selected = action.selected;

            return {
                ...state,
                allDeliveries : state.allDeliveries.map(delivery => {
                    if(delivery.name === local){
                        delivery.food.map(category => {
                            category.menu.map(food => {
                                if(food.id === ID){
                                    food.selected = selected;
                                }
                                return food;
                            })
                            return category;
                        })
                    }
                    return delivery;
                })
            }

        break;

        case 'set_last_local':

            return {
                ...state,
                lastLocal : action.id
            }

        break;

    }
}

const handleCart = (state, action) => {

    switch (action.type) {
        case 'add_to_cart':
            
            return {
                ...state,
                cart : state.cart.concat(action.value)
            }

        break;
        case 'add_cant_to_item':

            return {
                ...state,
                cart : state.cart.map(v => {
                    if(parseInt(action.id) === v.id && v.local === action.local){
                        v.cant = parseInt(action.cant)
                    }
                    return v
                })
            }

        break;
        case 'remove_product_of_cart':
            
            const local = action.local;
            const ID = parseInt(action.id);

            return {
                ...state,
                cart : state.cart.filter(item => {
                    if(item.local !== local || item.id !== ID){
                        return item;
                    }
                })
            }

        break;
    }

}