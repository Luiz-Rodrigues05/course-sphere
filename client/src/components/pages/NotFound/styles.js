export const getErrorPageStyles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 80px)',
    textAlign: 'center',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
  },
  imageWrapper: {
    width: '100%',
    maxWidth: '450px',
    marginBottom: theme.spacing(4),
    '& svg': {
      width: '100%',
      height: 'auto',
    },
  },
  title: {
    ...theme.typography.h3,
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    ...theme.typography.body1,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
    maxWidth: '500px',
  },
  button: {
    padding: theme.spacing(1.5, 4),
    borderRadius: theme.shape.borderRadius,
    fontWeight: 600,
  },
});