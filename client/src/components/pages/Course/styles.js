export const getCourseDetailsStyles = (theme) => ({
    mainContent: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 64px)',
    },
    sectionCard: {
      marginBottom: theme.spacing(3),
    },

    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    description: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    dates: {
      color: theme.palette.text.disabled,
    },
    // NOVO: Placeholder para a lista de instrutores
    instructorList: {
      marginTop: theme.spacing(2),
    }
  });