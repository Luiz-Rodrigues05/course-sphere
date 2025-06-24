export const getLessonCardStyles = (theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    minHeight: 200,
    borderRadius: '8px',
    boxShadow: theme.shadows[1],
    overflow: 'hidden',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[4],
    },
  },
  thumbnail: {
    height: 125,
    objectFit: 'cover',
  },
  info: {
    padding: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  status: {
    marginTop: 'auto',
    alignSelf: 'flex-start',
  },
  actions: {
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1, 1, 1),
  },
});