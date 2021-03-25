const customAvatarStyle = (theme) => ({
    avatarWrapper: {
      margin: '0 auto',
      textAlign: 'center',
      '& a': {
        display: 'block',
        margin: '0 auto',
        textDecoration: 'none'
      }
    },
    avatarLarge: {
      width: theme.spacing(8),
      height: theme.spacing(8),
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    avatarText: {
      color: theme.fontColor,
      fontSize: '1.2em',
      maxWidth: theme.drawerLeftWidth - 10,
      display: 'inline-block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  });
  
export default customAvatarStyle;  