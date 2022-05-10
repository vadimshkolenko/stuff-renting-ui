import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@material-ui/core'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import AddIcon from '@mui/icons-material/Add'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useDispatch } from 'react-redux'
import { logout } from '../store/slices/accountSlice'
import { useNavigate } from 'react-router-dom'

const settings = [
  { name: 'Мои вещи' },
  { name: 'Мои сделки', action: 'redirect', page: 'deals' },
  { name: 'Настройки' },
  { name: 'Выход', action: 'logout' },
]

const Header: FC = () => {
  const dispatch = useDispatch()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const navigate = useNavigate()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = async (action: string, page?: string) => {
    switch (action) {
      case 'logout':
        await dispatch(logout())
        navigate('/login')
        break
      case 'redirect':
        navigate(page)
        break
      default:
        console.log('default')
    }

    setAnchorElUser(null)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/*@ts-ignore*/}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              SOUTH STUFF
            </Typography>
          </NavLink>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            <Button
              component={NavLink}
              to="/create-ad"
              variant="outlined"
              color="inherit"
              endIcon={<AddIcon />}
            >
              Создать объявление
            </Button>
            <IconButton
              size="medium"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <ShoppingBasketIcon />
            </IconButton>
            <IconButton
              size="medium"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <FavoriteIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/*@ts-ignore*/}
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() =>
                    handleCloseUserMenu(setting.action, setting.page)
                  }
                >
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/*@ts-ignore*/}
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
