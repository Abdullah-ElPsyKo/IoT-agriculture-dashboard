import * as React from 'react';
import Typography from '@mui/material/Typography';

interface TitleProps {
  children?: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return (
    <Typography
      variant="h6"
      color="primary"
      sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }}
    >
      {children}
    </Typography>
  );
};

export default Title;