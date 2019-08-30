export const reducers = (state, action) => {

    if(action.component === 'deliveries'){

        state = handleDeliveries(state, action)

    }else if(action.component === 'navigation'){

        state = handleNavigation(state, action)

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

    }
}

const handleNavigation = (state, action) => {

    return {...state, navigation : action.state}

}