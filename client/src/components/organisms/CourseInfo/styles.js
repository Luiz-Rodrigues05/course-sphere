export const getCourseInfoStyles = (theme) => ({
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
      gap: theme.spacing(2)
    },
    description: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    dates: {
      color: theme.palette.text.disabled,
    },
  });