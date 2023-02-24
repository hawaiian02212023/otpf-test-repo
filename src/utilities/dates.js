/**
 * Handles creation of datetime
 * current locale is set to current machine locale.
 * @params 
 *      step (number) -> determines days to step from today. Ex: IF 1, will get tomorrow date, if 2 get 2 days from now.
 * @returns (string) -> datetime (yyyy-mm-ddThh:mm)
*/
function getDateTime({ step = 0 }) {

    const today = new Date();
    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + step);

    const year = tomorrow.getFullYear();
    const month = tomorrow.getMonth() + 1;
    const date = tomorrow.getDate();
    const defaultTime = "10:00"

    // format: yyyy-mm-ddThh:mm
    return `${year}`
        .concat(`-${month.toString().length < 2 ? '0' + month : month}`)
        .concat(`-${date.toString().length < 2 ? '0' + date : date}`)
        .concat("T")
        .concat(defaultTime);
}

export {
    getDateTime
}