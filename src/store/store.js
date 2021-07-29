import { compose, configureStore } from '@reduxjs/toolkit'
import searchProductReducer from './slices/searchProductSlice'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default configureStore({
  reducer: {
    searchProduct: searchProductReducer
  },
  composeEnhancers
})