import moment from 'moment';

const parseDate = (dateStr, formatStr, isStrict) => {
    isStrict = isStrict || true;
    const d = moment(dateStr, formatStr, isStrict);
    if (!d._isValid){
        return null;
    };
    return d._d;
}

const formatDate = (date, formatStr) => {
    return moment(date).format(formatStr);
}

const formatDateStr = (dateStr, dateFormatStr, outFormatStr) => {
    const d = moment(dateStr, dateFormatStr, true);
    if (!d._isValid){
        return "";
    };
    return d.format(outFormatStr);
}

const isDateValid = (date) => {
    return moment(date)._isValid;
}

const isDateEqual = (date1, date2) => {
    if (!date1 || !date2){
        return false;
    }
    if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()){
        return true;
    }
    return false;
}

export default {
    parseDate,
    formatDate,
    formatDateStr,
    isDateValid,
    isDateEqual
}