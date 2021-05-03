import strings from '../../configs/strings';
import lists from '../../configs/lists';
import ConvertDateTimes from './convertDateTimes';

const formatScheduleMode = (mode, value, days) => {
    if (typeof value != "string" || value.length == 0){
        return "";
    }
    switch(mode){
        case lists.schedule.mode.monthly:
            return value.split(",").map((val) => Number(val));
        case lists.schedule.mode.weekly:
            return value.split(",").map((val) => Number(val));
        case lists.schedule.mode.auto:
            return value.split(",")
                .map((val) => new Date(val));
    }
}

const scheduleModeToString = (mode, value, days) => {
    if (typeof value != "string" || value.length == 0){
        return "";
    }
    let res = "", ch;
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
                .map((val) => ConvertDateTimes.formatDate(new Date(val), strings.defaultDateFormat))
                .join(", ");
    }
}

const generateNoteForSchedule = (scheduleObj) =>{
    let ans = [];
    if (scheduleObj.monthly.length > 0){
        let monthStr = "MONTHLY: \n";
        scheduleObj.monthly.forEach((month) => {
            monthStr+= "+ " + month.startDate + " - " + (month.endDate || "...") + ":  " + month.valueStr + "\n";
        });
        ans.push(monthStr);
    }
    
    if (scheduleObj.weekly.length > 0){
        let weekStr = "WEEKLY: \n";
        scheduleObj.weekly.forEach((week) => {
            weekStr+= "+ " + week.startDate + " - " + (week.endDate || "...") + ":  " + week.valueStr + "\n";
        });
        ans.push(weekStr);
    }

    if (scheduleObj.auto.length > 0){
        let autoStr = "AUTO: \n+ ";
        scheduleObj.auto.forEach((auto, index) => {
            if (index != 0){
                autoStr += ", ";
            }
            autoStr += auto.valueStr;
        });
        ans.push(autoStr);
    }
    return ans.join("\n");
}

export default {
    formatScheduleMode,
    scheduleModeToString,
    generateNoteForSchedule
}