import strings from './strings';
import ThemeType from '../utils/types/Theme';

// Languages
const languages = {
    "en": strings.english,
    "vn": strings.vietnamese
};

// Theme
const themes = {};
themes[ThemeType.LIGHT] = strings.light;
themes[ThemeType.DARK] = strings.dark;

// Appointment
const appointment = {
    staging: {
        new : "New",
        confirmed: "Confirmed",
        confirmHold: "Confirm Hold",
        rescheduled: "Rescheduled",
        checkInWaiting: "Check in Waiting",
        checkInSeated: "Check in Seated",
        checkOut: "Check Out",
        cancel: "Cancel",
        noShow: "No Show"
    }
}

// Staff
const staff = {
    staffType: {
        staff: "STAFF",
        provider: "PROVIDER"
    }
}

// Date Time
const date = {
    dates: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    daysInMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    daysInWeek: [0, 1, 2, 3, 4, 5, 6]
}

// Schedule
const schedule = {
    mode: {
        monthly: "MONTHLY",
        weekly: "WEEKLY",
        auto: "AUTO"
    }
}

export default {
    languages,
    themes,
    appointment,
    staff,
    schedule,
    date
}