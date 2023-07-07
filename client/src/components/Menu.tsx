import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AccountMenu from "@mui/material/Menu";
import Item from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import LogoutIcon from "@mui/icons-material/Logout";

import MenuItem from "src/components/Menu/MenuItem";

import { ARTICLES_ROUTE, AUTH_ROUTE } from "src/constants/routes";

const Menu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = !!anchorEl;
  const handleClose = () => setAnchorEl(null);
  const goToPage = (routeName: string): void => navigate(routeName);
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      padding="15px"
      bgcolor="orangered"
    >
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <MenuItem title="Articles" onClick={() => goToPage(ARTICLES_ROUTE)} />
        <MenuItem title="Auth" onClick={() => goToPage(AUTH_ROUTE)} />
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      {/* add if condition */}
      <AccountMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Item onClick={handleClose}>
          <ListItemIcon>
            <Avatar style={{ width: "24px", height: "24px" }} />
          </ListItemIcon>
          Profile
        </Item>
        <Item onClick={handleClose}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </Item>
      </AccountMenu>
    </Box>
  );
};

export default Menu;
