export const getInstructorListStyles = (theme) => ({
  sectionHeader: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    gap: theme.spacing(2),
  },
  contentWrapper: {
    minHeight: '180px',
    display: 'flex',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(2),
  },
});