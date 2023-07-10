import { useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Item from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AccountMenu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";

import MenuItem from "src/components/Menu/MenuItem";

import { getEmail } from "src/store/auth/selectors";
import { useAuthActions } from "src/store/auth/hooks/useAuthActions";

import { ARTICLES_ROUTE, AUTH_SIGN_IN_ROUTE } from "src/constants/routes";

const Menu = () => {
  const navigate = useNavigate();
  const email = useSelector(getEmail);
  const { signOut } = useAuthActions();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClose = (): void => setAnchorEl(null);

  const goToPage = (routeName: string): void => navigate(routeName);

  const handleClick = (event: MouseEvent<HTMLElement>): void =>
    setAnchorEl(event.currentTarget);

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      padding="15px"
      bgcolor="#1976d2"
    >
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <MenuItem title="Articles" onClick={() => goToPage(ARTICLES_ROUTE)} />
        <MenuItem title="Auth" onClick={() => goToPage(AUTH_SIGN_IN_ROUTE)} />
        <Tooltip
          title="Account settings"
          style={{
            opacity: email ? 1 : 0,
            visibility: email ? "visible" : "hidden",
          }}
        >
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32, backgroundColor: "#9c27b0" }}>
              {email ? email?.[0]?.toUpperCase() : ""}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <AccountMenu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        style={{
          opacity: email ? 1 : 0,
          visibility: email ? "visible" : "hidden",
        }}
      >
        <Item
          onClick={() => {
            handleClose();
            signOut();
          }}
        >
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
