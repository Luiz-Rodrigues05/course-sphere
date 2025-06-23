export const getLoginPageStyles = (theme) => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: theme.palette.primary.main, 
      flexDirection: { xs: 'column', md: 'row' },
      textAlign: 'left',
    },
    welcomeBox: {
      flex: 1,
      maxWidth: { xs: '100%', md: '50%' },
    },
    welcomeTitle: {
      color: theme.palette.primary.accent, 
      fontWeight: 'bold',
    },
    welcomeSubtitle: {
      color: theme.palette.primary.accent, 
      marginTop: theme.spacing(1),
    },
    cardBox: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      maxWidth: '400px',
    },
  });