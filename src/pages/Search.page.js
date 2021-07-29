import { useEffect } from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import CheckboxFiltersComponent from '../components/filters/CheckboxFilters.component';
import RadioButtonFiltersComponent from '../components/filters/RadioButtonFilters.component';
import ProductCardComponent from '../components/product/ProductCard.component';
import { filteredProductSearch, newProductSearch, updateShowLoadingIcon } from '../store/slices/searchProductSlice';
import SearchProductUtils from '../utils/SearchProductUtils';
import ConstantUtils from '../utils/ConstantUtils';
import CommonUtils from '../utils/CommonUtils';
import { useState } from 'react';
import CustomNavbar from '../components/navbar/CustomNavbar.component';
import NetworkErrorAlert from '../components/alerts/NetworkError.alert';

function Search() {
    const dispatch = useDispatch();

    const searchResult = useSelector(state => {
        return CommonUtils.returnDefaultListOnException((state) => {
            return state.searchProduct.productsInfo.productsList
        }, state, [])
    });

    const filteredSearchResult = useSelector(state => {
        return CommonUtils.returnDefaultListOnException((state) => {
            return state.searchProduct.productsInfo.filteredProductsList
        }, state, [])
    });

    const showLoadingIcon = useSelector(state => state.searchProduct.showLoadingIcon)

    const [showNetworkErrorMessage, setShowNetworkErrorMessage] = useState(false);

    const [searchFiltersObject, setSearchFiltersObject] = useState({
        [ConstantUtils.filterTags.FILTER_BY_GENDER]: '',
        [ConstantUtils.filterTags.FILTER_BY_CATEGORY]: {},
        [ConstantUtils.filterTags.FILTER_BY_BRAND]: {}
    })

    const filtersByGender = SearchProductUtils.generateFilterOptionsByKey(searchResult, ConstantUtils.productFilterKeys.GENDER);
    const filterByCategories = SearchProductUtils.generateFilterOptionsByKey(searchResult, ConstantUtils.productFilterKeys.CATEGORY);
    const filtersByBrand = SearchProductUtils.generateFilterOptionsByKey(searchResult, ConstantUtils.productFilterKeys.BRAND);
    // console.log("Filter by gender", filtersByGender)
    // console.log("Filter by filterByCategories", filterByCategories)
    // console.log("Filter by filtersByBrand", filtersByBrand)


    // Fetch data on page load
    const fetchData = async () => {
        try {
            dispatch(updateShowLoadingIcon({
                showLoadingIcon: true
            }))
            const response = await SearchProductUtils.getProducts();
            SearchProductUtils.dispatchNewSearchResults(dispatch, response);
        } catch (error) {
            console.log("SearchPage error fetchData", error)
            setShowNetworkErrorMessage(true);
        } finally {
            dispatch(updateShowLoadingIcon({
                showLoadingIcon: false
            }))
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Callback to call when filters has been changed
    const onSearchFilterChangedCallback = (searchFilter, key) => {
        try {
            dispatch(updateShowLoadingIcon({
                showLoadingIcon: true
            }))

            console.log("onSearchFilterChangedCallback", searchFilter, key)
            const newSearchFiltersObject = { ...searchFiltersObject }
            newSearchFiltersObject[key] = searchFilter;

            setSearchFiltersObject(newSearchFiltersObject);
            console.log("newSearchFiltersObject ", newSearchFiltersObject)

            const filteredRes = SearchProductUtils.filterProductsList(searchResult, newSearchFiltersObject);
            console.log("filteredRes", filteredRes)

            dispatch(filteredProductSearch({
                filteredProductsList: filteredRes,
            }))

        } catch (error) {
            console.log("Error SearchPage onSearchFilterChangedCallback ", error)
        } finally {
            dispatch(updateShowLoadingIcon({
                showLoadingIcon: false
            }))
        }
    }

    // Creating label names
    const customLabelForCheckBoxes = (filtersObject, filterItemKey) => {
        return filterItemKey + ' (' + filtersObject[filterItemKey] + ')';
    }

    return (
        <Container fluid>

            {/* Navigation bar */}
            <CustomNavbar />

            {/* Show Network error alert */}
            {showNetworkErrorMessage === true &&
                <NetworkErrorAlert
                    onCloseCallback={() => { setShowNetworkErrorMessage(false) }}
                />
            }

            {/* Contains the loading icon */}
            <Row className='justify-content-center mt-2' style={{ height: 50 }}>
                {showLoadingIcon === true &&
                    <Spinner animation="border" />
                }
            </Row>

            <Row className='border-top'> {/* Contains the sidemenu and products */}

                <Col xs={2} className='border-end'> {/* Contains the sidemenu for filters */}

                    {/* Contains gender radio filters */}
                    <RadioButtonFiltersComponent
                        title={'Gender'}
                        name={ConstantUtils.filterTags.FILTER_BY_GENDER}
                        onChangeCallback={onSearchFilterChangedCallback}
                        filtersObject={filtersByGender}
                    />

                    {/* Contains category checkbox filters */}
                    <CheckboxFiltersComponent
                        title={'Categories'}
                        name={ConstantUtils.filterTags.FILTER_BY_CATEGORY}
                        filtersObject={filterByCategories}
                        customLabel={customLabelForCheckBoxes}
                        onChangeCallback={onSearchFilterChangedCallback}
                        showMax={8}
                    />

                    {/* Contains brand checkbox filters */}
                    <CheckboxFiltersComponent
                        title={'Brand'}
                        name={ConstantUtils.filterTags.FILTER_BY_BRAND}
                        filtersObject={filtersByBrand}
                        customLabel={customLabelForCheckBoxes}
                        onChangeCallback={onSearchFilterChangedCallback}
                        showMax={8}
                    />
                </Col>

                <Col xs={10} className='mt-2'> {/* Column to show products */}

                    {/* Shows 5 products on medium screens and 1 on small screens */}
                    <Row xs={1} md={5} className="g-1">
                        {
                            filteredSearchResult.map((productItem, index) => {
                                return (
                                    <Col key={index}>
                                        <ProductCardComponent
                                            productItem={productItem}
                                        />
                                    </Col>
                                );
                            })
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Search;