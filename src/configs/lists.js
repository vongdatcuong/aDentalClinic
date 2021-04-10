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

export default {
    languages,
    themes,
    appointment,
    staff
}