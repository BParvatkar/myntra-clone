import { useState } from 'react';
import CreateFilterOptionsComponent from './CreateFilterOptions.component'


// Component for radio button filters
const CheckboxFilters = (props) => {
    const title = props.title === undefined ? '' : props.title; // To show title for the filter

    const filtersObject = props.filtersObject; // Filter options
    const filterName = props.name; // Name for each filter option

    const customLabel = props.customLabel; // Callback to create custom label name

    const filtersObjectSize = Object.keys(filtersObject).length // Length of filter options
    const showMax = props.showMax === undefined ? filtersObjectSize : props.showMax; // How many options to show by default

    const onChangeCallback = props.onChangeCallback; // Callback to be called when filters are clicked

    const [selectedItems, setSelectedItems] = useState({}); // Maintain state of selected filter items

    const handleChange = (e) => {
        console.log("CheckboxFilters handleChange", e.target.id)
        var item = e.target.id;
        const newState = { ...selectedItems }

        if (newState[item] === undefined) {
            newState[item] = item;
            setSelectedItems(newState)
        } else {
            delete newState[item];
            setSelectedItems(newState)
        }

        if (onChangeCallback !== undefined) {
            onChangeCallback(newState, filterName);
        }
    }

    return (
        <div className='border-bottom mb-1'>
            <strong>{title}</strong>

            {/* Fill the checkbox options */}
            <CreateFilterOptionsComponent
                filtersObject={filtersObject}
                type={'checkbox'}
                filterName={filterName}
                customLabel={customLabel}
                onChange={handleChange}
                showMax={showMax}
            />
        </div>
    );
}

export default CheckboxFilters;