const customAvatarStyle = (theme) => ({
    avatarWrapper: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      textAlign: 'center',
      '& a': {
        display: 'block',
        margin: '0 auto',
        textDecoration: 'none'
      }
    },
    avatarLarge: {
      width: theme.spacing(9),
      height: theme.spacing(9),
      margin: '0 auto'
    },
    avatarText: {
      color: theme.fontColor,
      fontSize: '1.2em',
      marginTop: theme.spacing(1),
    },
  });
  
export default customAvatarStyle;  