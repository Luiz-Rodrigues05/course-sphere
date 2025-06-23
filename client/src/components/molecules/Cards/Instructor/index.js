import React from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getInstructorCardStyles } from './styles';

const InstructorCard = ({ instructor }) => {
  const theme = useTheme();
  const styles = getInstructorCardStyles(theme);

  return (
    <Card sx={styles.card}>
      <Avatar
        alt={instructor.name}
        src={instructor.imageUrl}
        sx={styles.avatar}
      />
      <CardContent sx={styles.cardContent}>
        <Typography variant="h6" component="h3">
          {instructor.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InstructorCard;