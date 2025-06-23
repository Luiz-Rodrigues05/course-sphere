export const getCourseCardStyles = (theme) => ({
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardContent: {
      flexGrow: 1,
    },
    description: {
      marginTop: theme.spacing(1),
      minHeight: '60px',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 3,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    dates: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between',
    },
    cardActions: {
      justifyContent: 'flex-end',
    }
  });