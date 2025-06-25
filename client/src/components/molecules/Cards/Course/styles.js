

export const getCourseCardStyles = (theme) => ({
  card: {
    height: '250px',
    width: '270px',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  title: {
    wordBreak: 'break-word',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  descriptionContainer: {
    flexGrow: 1,
    overflow: 'hidden',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  description: {
    wordBreak: 'break-word',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
  },
  emptyDescription: {
    fontStyle: 'italic',
    color: theme.palette.text.disabled,
  },
  dates: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardActions: {
    padding: 'none',
    justifyContent: 'flex-end',
  }
});
