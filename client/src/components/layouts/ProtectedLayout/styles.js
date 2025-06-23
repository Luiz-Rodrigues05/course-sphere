export const getProtectedLayoutStyles = (theme) => ({
    layoutContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
    },
    mainContent: {
      flexGrow: 1,
      padding: theme.spacing(4, 4), 
    },
  });