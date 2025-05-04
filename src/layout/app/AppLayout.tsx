import { ReactNode, useState } from "react";
import { Box } from "@mui/material";
import { Main } from "../../components/app/Main";
import { NavBar } from "../../components/app/NavBar";
import { SideBar } from "../../components/app/SideBar";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar toggleDrawer={toggleDrawer} />

      {/* Sidebar */}
      <SideBar open={openDrawer} toggleDrawer={toggleDrawer} />

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Main>
          {children}
        </Main>
      </Box>
    </Box>
  );
};
