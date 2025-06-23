export const loginPageStyles = {
    container: (theme) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#147247',
      flexDirection: { xs: 'column', md: 'row' },
      padding: 2,
      gap: { xs: 2, md: 5 },
      textAlign: 'left',
    }),
    welcomeBox: {
      flex: 1,
      maxWidth: { xs: '100%', md: '50%' },
    },
    welcomeTitle: (theme) => ({
      color: theme.palette.text.accent,
      fontWeight: 'bold',
    }),
    welcomeSubtitle: (theme) => ({
      color: theme.palette.text.secondary,
      marginTop: 1,
    }),
    cardBox: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      maxWidth: '400px',
    },
  };