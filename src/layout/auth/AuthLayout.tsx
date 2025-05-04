import { Grid, Typography } from "@mui/material";
import React from "react";

interface AuthLayoutProps {
  title?: string;
}

export const AuthLayout: React.FC<React.PropsWithChildren<AuthLayoutProps>> = ({ children, title = '' }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main' }}
    >
      <Grid
        item
        xs={3}
        sx={{
          width: { sm: 420 },
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', pt: '5px' }}>
          {title}
        </Typography>

        {children}
      </Grid>
    </Grid>
  );
};
