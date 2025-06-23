import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getInstructorsListStyles } from './styles';

const InstructorsList = () => {
  const theme = useTheme();
  const styles = getInstructorsListStyles(theme);

  return (
    <Box>
      <Box sx={styles.sectionHeader}>
        <Typography variant="h5" component="h2">
          Instrutores
        </Typography>
        <Button variant="outlined" size="small">Gerenciar</Button>
      </Box>
      <Card>
        <CardContent sx={styles.instructorList}>
          <Typography color="text.secondary">
            (Aqui será exibida a lista de instrutores do curso)
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InstructorsList;