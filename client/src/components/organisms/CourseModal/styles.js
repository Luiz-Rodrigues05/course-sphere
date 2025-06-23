export const getCourseModalStyles = (theme) => ({
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 24,
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
});