export const getNavbarStyles = (theme) => ({
    navbar: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logoLink: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1.5),
      textDecoration: 'none',
    },
    logoIcon: {
      fontSize: '2rem',
      color: theme.palette.primary.accent,
    },
    logoText: {
      fontWeight: 600,
      letterSpacing: '0.5px',
      fontSize: '1.6rem',
      color: theme.palette.text.accent,
      display: {
        xs: 'none',
        sm: 'block',
      },
    },
    navLinks: {
      display: 'flex',
      gap: theme.spacing(1),
    },
  });