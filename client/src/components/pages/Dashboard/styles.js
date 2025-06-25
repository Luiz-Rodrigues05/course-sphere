export const getDashboardStyles = (theme) => ({
    root: {
      backgroundColor: theme.palette.background.default,
    },
    welcomeMessage: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: theme.spacing(4),
      color: theme.palette.text.primary,
    },
  });