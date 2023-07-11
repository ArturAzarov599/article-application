import { useState, MouseEvent } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Item from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import AccountMenu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import LogoutIcon from '@mui/icons-material/Logout'
import ListItemIcon from '@mui/material/ListItemIcon'

import MenuItem from 'src/components/Menu/MenuItem'

import { getEmail } from 'src/store/auth/selectors'
import { useAuthActions } from 'src/store/auth/hooks/useAuthActions'

import { ARTICLES_ROUTE, AUTH_SIGN_IN_ROUTE } from 'src/constants/routes'

const Menu = () => {
  const navigate = useNavigate()
  const email = useSelector(getEmail)
  const { signOut } = useAuthActions()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClose = (): void => setAnchorEl(null)

  const goToPage = (routeName: string): void => navigate(routeName)

  const handleClick = (event: MouseEvent<HTMLElement>): void => setAnchorEl(event.currentTarget)

  const onSignOutHandler = (): void => {
    handleClose()
    signOut()
  }

  return (
    <Box display='flex' justifyContent='flex-end' padding='16px' bgcolor='#1976d2' height='50px'>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <MenuItem title='Articles' onClick={() => goToPage(ARTICLES_ROUTE)} />

        {!email ? (
          <MenuItem title='Auth' onClick={() => goToPage(AUTH_SIGN_IN_ROUTE)} />
        ) : (
          <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32, backgroundColor: '#9c27b0' }}>
              {email[0].toUpperCase()}
            </Avatar>
          </IconButton>
        )}
      </Box>

      <AccountMenu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Item onClick={onSignOutHandler}>
          <ListItemIcon>
            <LogoutIcon fontSize='small' />
          </ListItemIcon>
          Logout
        </Item>
      </AccountMenu>
    </Box>
  )
}

export default Menu
