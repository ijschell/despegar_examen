export const deliveries = (state, action) => {

    switch (action.type) {
        case 'change_deliveries':

            var deliveriesFiltered = JSON.parse(sessionStorage.getItem('allDeliveries'));

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

    return state;

}