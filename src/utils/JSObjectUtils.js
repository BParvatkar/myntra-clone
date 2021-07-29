
// Check if json object is empty
const isJSObjectEmpty = (obj) => {
    return obj === null || obj === undefined || (Object.keys(obj).length === 0 && obj.constructor === Object)
}

const defaultExports = {
    isJSObjectEmpty,
}

export default defaultExports;