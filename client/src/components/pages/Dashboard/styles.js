export const getDashboardStyles = (theme) => ({
    root: {
      backgroundColor: theme.palette.background.default,
      minHeight: 'calc(100vh - 64px)',
    },
    welcomeMessage: {
      marginBottom: theme.spacing(4),
      color: theme.palette.text.primary,
    },
  });