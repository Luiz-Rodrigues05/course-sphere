export const getLoginPageStyles = (theme) => ({
  container: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    flexDirection: { xs: 'column', md: 'row' },
  },
  leftPanel: {
    flexBasis: { md: '60%' },
    backgroundColor: '#ffffff',
    display: { xs: 'none', md: 'flex' },
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  svgImage: {
    width: '80%',
    maxWidth: '450px',
    height: 'auto',
  },
  rightPanel: {
    flex: 1,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  mobileHeader: {
    display: { xs: 'block', md: 'none' },
    color: theme.palette.text.onDark,
    fontWeight: 'bold',
    marginBottom: theme.spacing(4),
    textAlign: 'center',
  },
  cardBox: {
    width: '100%',
    maxWidth: '400px',
  },
});