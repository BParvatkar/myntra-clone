
import ListUtils from './ListUtils'

// Returns default list value when callback method fails
const returnDefaultListOnException = (callback, state, defaultList) => {
    try {
        const resultList = callback(state)
        if (ListUtils.isListEmpty(resultList)) {
            return defaultList;
        } else {
            return resultList;
        }
    } catch (error) {
        return defaultList;
    }
}

const defaultExports = {
    returnDefaultListOnException,
}

export default defaultExports;