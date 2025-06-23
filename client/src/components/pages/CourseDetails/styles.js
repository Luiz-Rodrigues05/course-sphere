export const getCourseDetailsStyles = (theme) => ({
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 64px)',
    },
    description: {
      fontSize: '1.1rem',
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(2.5),
    },
    dates: {
      color: theme.palette.text.disabled,
      marginBottom: theme.spacing(4),
    },
  });