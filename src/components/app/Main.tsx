import { ReactNode } from 'react';
import { Box, Toolbar } from '@mui/material';

export const Main = ({ children }: { children: ReactNode }) => {
    return (
        <Box 
            component="main" 
            sx={{ flexGrow: 1, paddingTop: 2 }}
        >
            <Toolbar/>  
            {children}
        </Box>
    );
};
