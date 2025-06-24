export const getEditInstructorsPageStyles = (theme) => ({
  wrapper: {
    padding: theme.spacing(3),
    maxWidth: 800,
    margin: 'auto',
    marginTop: theme.spacing(4),
  },
  container: {
    padding: theme.spacing(4),
  },
  listContainer: {
    minHeight: '200px',
    position: 'relative',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  feedbackContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
});