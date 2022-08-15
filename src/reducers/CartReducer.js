const initialState = {
    products: [],
    address: [],
    discount: 0,
    delivery: 0
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_PRODUCT':
            let products = [...state.products];

            let id = action.payload.data.id;
            let index = products.findIndex(item=>item.id === id);

            if(index > -1) {
                products[index].qt += action.payload.qt;
            } else {
                products.push({
                    ...action.payload.data,
                    qt: action.payload.qt
                })
            }
            
            return {...state, products};
        case 'CHANGE_PRODUCT':
            let productsB = [...state.products];

            if (productsB[action.payload.key]) {
                switch(action.payload.type) {
                    case '-':
                        productsB[action.payload.key].qt--;

                        if(productsB[action.payload.key].qt <= 0) {
                            productsB = products.filter((item, index) => index !== action.payload.key);
                        }
                    break;
                    case '+':
                        productsB[action.payload.key].qt++;
                    break;
                }
            }

            return {...state, products};
        default:
            return 0;

    }

    return state;
}