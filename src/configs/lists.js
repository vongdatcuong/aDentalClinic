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

export default {
    languages,
    themes
}