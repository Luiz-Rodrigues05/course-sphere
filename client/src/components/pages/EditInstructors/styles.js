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
    maxHeight: '300px',
    overflowY: 'auto',
    position: 'relative',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
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
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
});
