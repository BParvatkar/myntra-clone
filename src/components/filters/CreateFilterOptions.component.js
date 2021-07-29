import { Form } from "react-bootstrap";

// Generate filter options using object contains filters
const CreateFilterOptions = (props) => {
    const filtersObject = props.filtersObject; // Filters object containing all filter
    const filterName = props.filterName; // Name for each filter item

    const filtersObjectSize = Object.keys(filtersObject).length // Length of the filter options
    const showMax = props.showMax === undefined ? filtersObjectSize : props.showMax; // Max options to show

    const type = props.type; // type of filter options: radio / checkbox

    const onChange = props.onChange; // Callback to call when filter options are clicked
    const customLabel = props.customLabel; // Method to create custom label names

    var filterOptions = [] // Contains list of all filter options

    for (var filterItemKey in filtersObject) {

        // If filteroptions length has crossed max show options then break
        if (filterOptions.length > showMax) {
            break;
        }

        var label = filterItemKey; // Default label name in case customLabel method is not given
        if (customLabel !== undefined) {
            label = customLabel(filtersObject, filterItemKey)
        }

        filterOptions.push(
            <Form.Check
                key={filterItemKey}
                type={type}
                id={filterItemKey}
                label={label}
                name={filterName}
                onChange={onChange}
                style={{
                    fontSize: 14,
                }}
            />
        )
    }
    return (
        <Form>
            <div>
                {filterOptions}

                {showMax < filtersObjectSize &&
                    <a href="#">Show {filtersObjectSize - showMax} more</a>
                }
            </div>
        </Form>
    );
}

export default CreateFilterOptions;