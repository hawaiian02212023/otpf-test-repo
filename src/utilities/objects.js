/**
 * Handles checking of object is falsey.
 * 
 * @param {*} obj 
 * @returns (boolean) => True if object is empty otherwise, false.
 */

function isEmptyObject(obj) {
    return !obj || Object.keys(obj).length === 0;
}

export {
    isEmptyObject
}