const settingsStyle = (theme) => ({
 container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: '100%',
  },
  title: {
    fontWeight: 600
  },
  tabsWrapper: {
    flexGrow: 1,
    display: 'flex',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
  tabs: {
    borderRight: `2px solid ${theme.palette.divider}`,
    '& .MuiTabs-indicator': {
      borderRight: `2px solid ${theme.primaryColor[0]}`,
      backgroundColor: theme.primaryColor[0]
    }
  },
  tab: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    fontWeight: 600,
    '& .MuiTab-wrapper': {
        
    },
    '&.Mui-selected': {
      color: theme.fontColor,
      backgroundColor: theme.primaryColor[0],
      borderRadius: '5px',
    }
  }
});

export default settingsStyle;