import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

interface Props {
    open: boolean;
    toggleDrawer: (newOpen: boolean) => void;
}

export const SideBar = ({ open, toggleDrawer }: Props) => {
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
            <List>
                {['Productos', 'Ordenes'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer open={open} onClose={() => toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
