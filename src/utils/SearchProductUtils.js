import { ApiService } from "../services/ApiService"
import ConstantUtils from './ConstantUtils'
import StringUtils from './StringUtils'
import JSObjectUtils from './JSObjectUtils'
import ListUtils from './ListUtils'
import { filteredProductSearch, newProductSearch } from "../store/slices/searchProductSlice"


// Get products from api
const getProducts = async (filterString = null) => {
    try {
        var productsJSON = await ApiService.searchProducts();

        const productsListKey = ConstantUtils.productFilterKeys.PRODUCTS_LIST

        // If filterString is given then filter the products
        if (!StringUtils.isStringEmpty(filterString)) {
            productsJSON[productsListKey] = productsJSON[productsListKey].filter(productItem => {
                return productItem.productName.toLowerCase().includes(filterString.toLowerCase())
            })
        }

        return productsJSON;
    } catch (error) {
        console.log("Error getProducts", error);
        throw error
    }
}

// Generate filter options from product list for the given key
const generateFilterOptionsByKey = (productsList, key) => {
    const filterOptionsObject = {}

    if (ListUtils.isListEmpty(productsList)) {
        return filterOptionsObject;
    }

    for (var productItem of productsList) {
        if (productItem[key] !== undefined) {
            if (filterOptionsObject[productItem[key]] === undefined) {
                filterOptionsObject[productItem[key]] = 1;
            } else {
                filterOptionsObject[productItem[key]]++
            }
        }
    }

    return filterOptionsObject;
}


// Check if product gender matches the filter for gender
const isProductFromGivenGenderFilter = (productItem, genderFilterString) => {
    if (productItem[ConstantUtils.productFilterKeys.GENDER] === genderFilterString) {
        return true;
    } else {
        return false;
    }
}

// Check if product category matches the from the chosen filters
const isProductFromGivenCategoryFilters = (productItem, categoryFilters) => {
    if (categoryFilters[productItem[ConstantUtils.productFilterKeys.CATEGORY]] !== undefined) {
        return true;
    } else {
        return false;
    }
}

// Check if product brand matches the from the chosen filters
const isProductFromGivenBrandFilters = (productItem, brandFilters) => {
    if (brandFilters[productItem[ConstantUtils.productFilterKeys.BRAND]] !== undefined) {
        return true;
    } else {
        return false;
    }
}

// Filter productList based on the given filterObjects
const filterProductsList = (productsList, searchFiltersObject) => {
    console.log("filterProductsList searchFiltersObject", searchFiltersObject)

    var filteredProductList = [];
    var FILTER_TAG_GENDER = ConstantUtils.filterTags.FILTER_BY_GENDER;
    var FILTER_TAG_CATEGORY = ConstantUtils.filterTags.FILTER_BY_CATEGORY;
    var FILTER_TAG_BRAND = ConstantUtils.filterTags.FILTER_BY_BRAND;

    for (var productItem of productsList) {
        var isGenderMatched = false
        var isCategoryMatched = false
        var isBrandMatched = false

        // If any filter is empty for the product then include that product
        // else include only if the product matches the filter 

        if (
            StringUtils.isStringEmpty(searchFiltersObject[FILTER_TAG_GENDER])
            || isProductFromGivenGenderFilter(productItem, searchFiltersObject[FILTER_TAG_GENDER])
        ) {
            isGenderMatched = true;
        }

        if (
            JSObjectUtils.isJSObjectEmpty(searchFiltersObject[FILTER_TAG_CATEGORY])
            || isProductFromGivenCategoryFilters(productItem, searchFiltersObject[FILTER_TAG_CATEGORY])
        ) {
            isCategoryMatched = true;
        }

        if (
            JSObjectUtils.isJSObjectEmpty(searchFiltersObject[FILTER_TAG_BRAND])
            || isProductFromGivenBrandFilters(productItem, searchFiltersObject[FILTER_TAG_BRAND])
        ) {
            isBrandMatched = true;
        }

        if (isGenderMatched && isCategoryMatched && isBrandMatched) {
            filteredProductList.push(productItem);
        }
    }

    return filteredProductList;
}

// Dispatch logic to update search result in redux
const dispatchNewSearchResults = (dispatch, responseJSON) => {
    dispatch(newProductSearch({
        productsList: responseJSON[ConstantUtils.productFilterKeys.PRODUCTS_LIST]
    }))
    dispatch(filteredProductSearch({
        filteredProductsList: responseJSON[ConstantUtils.productFilterKeys.PRODUCTS_LIST]
    }))

}

const exportMethods = {
    getProducts,
    generateFilterOptionsByKey,
    filterProductsList,
    dispatchNewSearchResults,
}

export default exportMethods