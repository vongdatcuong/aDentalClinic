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

export default {
    parseDate,
    formatDate,
    formatDateStr
}