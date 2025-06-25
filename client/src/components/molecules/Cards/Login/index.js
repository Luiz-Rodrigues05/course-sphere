import { Card, CardHeader, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LoginForm from '../../Forms/Login';
import { getLoginCardStyles } from './styles';

const LoginCard = () => {
  const styles = getLoginCardStyles(useTheme());

  return (
    <Card sx={styles.card}>
      <CardHeader title="Login" sx={{ textAlign: 'center' }} />
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export default LoginCard;