import strings from '../../configs/strings';
import lists from '../../configs/lists';
import ConvertDateTimes from './convertDateTimes';

const formatScheduleMode = (mode, value) => {
    if (typeof value != "string" || value.length == 0){
        return "";
    }
    let res = "", ch;
    let days = lists.dates;
    switch(mode){
        case lists.schedule.mode.monthly:
            for (let i = 0; i < value.length; i++){
                ch = value.charAt(i);
                res+=ch;
                if (ch == ','){
                    res+= " ";
                }
            }
            return res;
        case lists.schedule.mode.weekly:
            return value.split(",").map((val) => days[val]).join(", ");
        case lists.schedule.mode.auto:
            return value.split(",")
                .map((val) => new Date(val))
                .sort((dateA, dateB) => dateA - dateB)
                .map((dateObj) => ConvertDateTimes.formatDate(dateObj, strings.defaultDateFormat))
                .join(", ");
    }
}

export default {
    formatScheduleMode
}