import { createSlice } from '@reduxjs/toolkit'

export const searchProductSlice = createSlice({
    name: 'searchProduct',
    initialState: {
        productsInfo: {
            productsList: [],
            filteredProductsList: [],
            filters: {},
        },
        showLoadingIcon: false,
    },
    reducers: {
        newProductSearch: (state, action) => {
            const payload = action.payload;
            console.log("Payload newProductSearch", payload);
            state.productsInfo.productsList = payload.productsList;
        },
        filteredProductSearch: (state, action) => {
            const payload = action.payload;
            console.log("Payload filteredProductSearch", payload);
            state.productsInfo.filteredProductsList = payload.filteredProductsList;
        },
        updateShowLoadingIcon: (state, action) => {
            const payload = action.payload;
            console.log("Payload isSearchingProducts", payload);
            state.showLoadingIcon = payload.showLoadingIcon
        }
    },
});

export const { newProductSearch, filteredProductSearch, updateShowLoadingIcon } = searchProductSlice.actions
export default searchProductSlice.reducer