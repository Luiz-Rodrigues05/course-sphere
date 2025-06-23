export const styles = {
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      width: '100%',
    },
    submitButton: (theme) => ({
      marginTop: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
      },
    }),
  };