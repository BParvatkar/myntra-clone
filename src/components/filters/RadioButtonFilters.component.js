import CreateFilterOptionsComponent from './CreateFilterOptions.component'

// Component for radio button filters
const RadioButtonFilters = (props) => {
    const title = props.title === undefined ? '' : props.title; // Title for radio buttons filter group

    const filtersObject = props.filtersObject; // Object containing all the filter options
    const filterName = props.name; // Name for each filter item

    const onChangeCallback = props.onChangeCallback; // Callback to call when filter option is clicked

    const handleChange = (event) => {
        console.log("RadioButtonFilters handleChange", event.target.id)
        if (onChangeCallback !== undefined) {
            onChangeCallback(event.target.id, filterName)
        }
    }

    return (
        <div class='mt-2 border-bottom'>
            <strong>{title}</strong>

            {/* Fill the checkbox options */}
            <CreateFilterOptionsComponent
                filtersObject={filtersObject}
                type={'radio'}
                filterName={filterName}
                onChange={handleChange}
            />
        </div>
    );
}

export default RadioButtonFilters;