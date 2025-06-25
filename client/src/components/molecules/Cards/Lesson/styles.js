export const getLessonCardStyles = (theme) => ({
  card: {
    width: '270px',
    height: '280px',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
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
    flexShrink: 0,
  },
  info: {
    padding: theme.spacing(2),
    flexGrow: 1, 
    minHeight: 0, 
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
    wordBreak: 'break-word',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  actions: {
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    flexShrink: 0
  },
});