import React, {useState, useContext, useCallback} from 'react';
import { makeStyles,  } from "@material-ui/core/styles";
import strings from '../../../configs/strings';
import lists from '../../../configs/lists';
// use i18next
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';

// Toast
import { toast } from 'react-toastify';

// Context
import { loadingStore } from '../../../contexts/loading-context';
import { themeStore } from '../../../contexts/theme-context';

// @material-ui/core Component
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';


// @material-ui/core icons
import BorderColorIcon from '@material-ui/icons/BorderColor';

// Component
import SimpleCombobox from '../../common/SimpleComboBox';

// API
import api from '../../../api/base-api';
import apiPath from '../../../api/path';
import AuthService from '../../../api/authentication/auth.service';

// Utils
import ThemeType from '../../../utils/types/Theme';

const useStyles = makeStyles((theme) => ({
  list: {
    padding: 0,
    '& .MuiListItem-root': {
        paddingTop: 0
    },
    '& .MuiListItemText-root': {
        marginTop: 0,
        '& .MuiListItemText-primary': {
            fontWeight: 600
        },
        '& .MuiButtonBase-root.MuiIconButton-root': {
            marginLeft: theme.spacing(2),
            paddingTop: theme.spacing(0.3)
        }
    },
    changeIconBtn: {
        
        
    }
  }
}));

const General = () => {
  const classes = useStyles();
  const {t, i18next} = useTranslation();
  const {loadingState, dispatchLoading} = useContext(loadingStore);
  const {themeState, dispatchTheme} = useContext(themeStore);

  const user = AuthService.getCurrentUser();

  // States
  const [language, setLanguage] = useState(user.language?.toLowerCase() || "en");
  const [theme, setTheme] = useState((user.theme != undefined)? user.theme : ThemeType.DARK);

  const [openLanguagePopover, setOpenLanguagePopover] = useState(false);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);

  const [openThemePopover, setOpenThemePopover] = useState(false);
  const [themeAnchorEl, setThemeAnchorEl] = useState(null);

  const languagePopoverId = 'language-popover-id';
  const languages = Object.keys(i18n.services.resourceStore.data).map((language) => {{
      return {
        text: t(lists.languages[language]),
        value: language
      }
    }
  });

  const themes = Object.keys(lists.themes).map((theme) => {
    return {
      text: t(lists.themes[theme]),
      value: theme
    }
  });

  const themePopoverId = 'theme-popover-id';

  const handleOpenLanguagePopover = (event) => {
    setOpenLanguagePopover(true);
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleCloseLanguagePopover = () => {
    setLanguageAnchorEl(null);
    setOpenLanguagePopover(false);
  };

  const handleChangeLanguage = useCallback(async (value) => {
    if (value === language){
      return;
    }
    try {
      dispatchLoading({type: strings.setLoading, isLoading: true});
      const result = await api.httpPatch({
        url: apiPath.staff.staff + '/' + user.staff_id,
        body: {
          language: value
        }
      })
      if (result.success){
        setLanguage(value);
        user.language = value;
        AuthService.updateCurrentUser(user);
        handleCloseLanguagePopover();
        i18n.changeLanguage(value);
      } else {
        toast.error(result.message);
      }
    } catch(err){
      toast.error(t(strings.changeLanguageErrMsg));
    } finally {
      dispatchLoading({type: strings.setLoading, isLoading: false});
    }
  }, [user, language]);

  const handleOpenThemePopover = (event) => {
    setOpenThemePopover(true);
    setThemeAnchorEl(event.currentTarget);
  };

  const handleCloseThemePopover = () => {
    setThemeAnchorEl(null);
    setOpenThemePopover(false);
  };

  const handleChangeTheme = useCallback(async (value) => {
    if (value === language){
      return;
    }
    try {
      dispatchLoading({type: strings.setLoading, isLoading: true});
      const result = await api.httpPatch({
        url: apiPath.staff.staff + '/' + user.staff_id,
        body: {
          theme: value
        }
      })
      if (result.success){
        setTheme(value);
        user.theme = value;
        AuthService.updateCurrentUser(user);
        handleCloseThemePopover();
        dispatchTheme({type: strings.setTheme, theme: value});
      } else {
        toast.error(result.message);
      }
    } catch(err){
      toast.error(t(strings.changeThemeErrMsg));
    } finally {
      dispatchLoading({type: strings.setLoading, isLoading: false});
    }
  }, [user]);
  
  return (
    <List className={classes.list}>
        <ListItem key={0}>
            <ListItemText
                primary={
                    <Grid container>
                        <Grid item md={2} xs={3}>
                            <span>{t(strings.language)}
                            </span>
                        </Grid>
                        <Grid item md={2} xs={2}>
                            <IconButton color="default" aria-label="change language" onClick={handleOpenLanguagePopover}>
                                <BorderColorIcon className={classes.changeIconBtn} />
                            </IconButton>
                        </Grid>
                    </Grid>
                }
                secondary={t(lists.languages[i18n.language])}
            />
        </ListItem>
        <ListItem key={1}>
            <ListItemText
                primary={
                    <Grid container>
                        <Grid item md={2} xs={3}>
                            <span>{t(strings.theme)}
                            </span>
                        </Grid>
                        <Grid item md={2} xs={2}>
                            <IconButton color="default" aria-label="change theme" onClick={handleOpenThemePopover}>
                                <BorderColorIcon className={classes.changeIconBtn} />
                            </IconButton>
                        </Grid>
                    </Grid>
                }
                secondary={t(lists.themes[themeState.type])}
            />
        </ListItem>
        {/* Language Popover */}
        <Popover 
            id={languagePopoverId}
            open={openLanguagePopover}
            anchorEl={languageAnchorEl}
            onClose={handleCloseLanguagePopover}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            >
            <SimpleCombobox list={languages} value={language} onChange={handleChangeLanguage}/>
        </Popover>
        {/* Theme Popover */}
        <Popover 
            id={themePopoverId}
            open={openThemePopover}
            anchorEl={themeAnchorEl}
            onClose={handleCloseThemePopover}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            >
            <SimpleCombobox list={themes} value={theme} onChange={handleChangeTheme}/>
        </Popover>
    </List>
    )
}

export default General;