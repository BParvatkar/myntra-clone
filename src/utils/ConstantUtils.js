
// Necessary keys of productItem returned from api
const productFilterKeys = {
    PRODUCTS_LIST: 'products',
    GENDER: 'gender',
    CATEGORY: 'category',
    BRAND: 'brand',
}

// Filter tags for storing filters set by user
const filterTags = {
    FILTER_BY_GENDER: 'FILTER_BY_GENDER',
    FILTER_BY_CATEGORY: 'FILTER_BY_CATEGORY',
    FILTER_BY_BRAND: 'FILTER_BY_BRAND',
}

const defaultExports = {
    productFilterKeys,
    filterTags,
}

export default defaultExports;