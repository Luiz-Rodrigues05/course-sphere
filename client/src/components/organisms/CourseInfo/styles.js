export const getCourseInfoStyles = (theme) => ({
  titleContainer: {
    wordBreak: 'break-word',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    gap: theme.spacing(2),
  },
  descriptionContainer: {
    marginBottom: theme.spacing(2),
  },
  description: {
    wordBreak: 'break-word',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: '99',
    WebkitBoxOrient: 'vertical',
  },
  emptyDescription: {
    fontStyle: 'italic',
    color: theme.palette.text.disabled,
  },
});