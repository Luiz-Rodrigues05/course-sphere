export const getLessonsListStyles = (theme) => ({
    lessonsSection: {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(4),
      paddingTop: theme.spacing(2),
    },
    gridContainer: {
      display: 'flex',
      flexDirection: 'row',
      overflowX: 'auto',
      gap: theme.spacing(3),
      padding: theme.spacing(2, 0, 1.5, 0),
      '&::-webkit-scrollbar': {
        height: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#ccc',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#aaa',
      },
    },
    feedbackContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '150px',
    },
    paginationContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(3),
    },
  });