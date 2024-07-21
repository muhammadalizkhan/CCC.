import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  MenuItem,
  Box,
  IconButton,
  useMediaQuery,
  Container,
  Popover,
  Fade,
  ThemeProvider,
  createTheme,
  Drawer,
  List,
  Divider,
  ListItemText,
  ListItemButton,
  Collapse,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f3f3f3',
    },
    background: {
      default: '#181C27',
      paper: '#252B37',
    },
  },
});

const menuItems = [
  {
    name: 'Explore',
    subItems: [
      { name: 'Join as a Writer', href: '/JoinWriter' },
      { name: 'Join as a Client', href: '/JoinClient' },
    ],
  },
  { name: 'Pricing', href: '/products' },
  {
    name: 'Services',
    subItems: [
      {
        name: 'SEO Content Writing',
        subItems: [
          { name: 'SaaS Content Marketing', href: '/analytics/reports/documents' },
          { name: 'Social Media Writing', href: '/analytics/reports/payments' },
          { name: 'Screenwriting', href: '/analytics/reports/refunds' },
        ],
      },
      {
        name: 'SEO Content Writing',
        subItems: [
          { name: 'SaaS Content Marketing', href: '/analytics/reports/documents' },
          { name: 'Social Media Writing', href: '/analytics/reports/payments' },
          { name: 'Screenwriting', href: '/analytics/reports/refunds' },
        ],
      },
      {
        name: 'SEO Content Writing',
        subItems: [
          { name: 'SaaS Content Marketing', href: '/analytics/reports/documents' },
          { name: 'Social Media Writing', href: '/analytics/reports/payments' },
          { name: 'Screenwriting', href: '/analytics/reports/refunds' },
        ],
      },
    ],
  },
  { name: 'Contact', href: '/contact' },
];

const NestedMenuItem = ({ item, handleClose }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <MenuItem
        onClick={handleClick}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        {item.name}
        {expanded ? <ExpandLess fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />}
      </MenuItem>
      <Divider />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ pl: 2 }}>
          {item.subItems.map((subItem, index) =>
            subItem.subItems ? (
              <NestedMenuItem key={index} item={subItem} handleClose={handleClose} />
            ) : (
              <MenuItem
                key={index}
                onClick={() => {
                  handleClose();
                  setExpanded(false);
                }}
                sx={{ pl: 2 }}
              >
                {subItem.name}
              </MenuItem>
            )
          )}
        </Box>
      </Collapse>
    </>
  );
};

const renderMobileMenuItem = (item, handleMobileExpand, mobileExpandedItem, depth = 0) => {
  if (item.subItems) {
    return (
      <React.Fragment key={item.name}>
        <ListItemButton
          onClick={() => handleMobileExpand(item.name)}
          sx={{ pl: 2 * (depth + 1) }}
        >
          <ListItemText primary={item.name} />
          {mobileExpandedItem === item.name ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={mobileExpandedItem === item.name} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.subItems.map((subItem) => renderMobileMenuItem(subItem, handleMobileExpand, mobileExpandedItem, depth + 1))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  } else {
    return (
      <ListItemButton key={item.name} sx={{ pl: 2 * (depth + 1) }}>
        <ListItemText primary={item.name} />
      </ListItemButton>
    );
  }
};

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event, menuName) => {
    setAnchorEl(event.currentTarget);
    setCurrentMenu(menuName);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentMenu(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileExpand = (itemName) => {
    setMobileExpandedItem(mobileExpandedItem === itemName ? null : itemName);
  };

  const goToPage = (href) => {
    navigate(href);
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="default" elevation={0} sx={{ bgcolor: '#181C27' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: '50px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="https://create-react-app.dev/img/logo.svg"
                alt="Logo"
                style={{ height: 40, marginRight: 16 }} 
              />
              {!isMobile && (
                <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                  {menuItems.map((item) => (
                    <Box
                      key={item.name}
                      sx={{
                        position: 'relative',
                        display: 'inline-block',
                        '&:hover .dropdown-content': {
                          display: 'block',
                        },
                      }}
                    >
                      <Button
                        color="inherit"
                        onClick={
                          item.subItems ? (event) => handleClick(event, item.name) : () => goToPage(item.href)
                        }
                        endIcon={item.subItems ? <ArrowDropDownIcon /> : null}
                        sx={{ textTransform: 'none', color: '#f3f3f3' }}
                      >
                        {item.name}
                      </Button>
                      {item.subItems && (
                        <Box
                          className="dropdown-content"
                          sx={{
                            display: currentMenu === item.name ? 'block' : 'none',
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            bgcolor: '#252B37',
                            borderRadius: 1,
                            minWidth: 150,
                            zIndex: 1,
                          }}
                        >
                          {item.subItems.map((subItem, index) =>
                            subItem.subItems ? (
                              <NestedMenuItem
                                key={index}
                                item={subItem}
                                handleClose={handleClose}
                              />
                            ) : (
                              <MenuItem
                                key={index}
                                onClick={() => goToPage(subItem.href)}
                                sx={{ color: '#f3f3f3', minWidth: 150 }}
                              >
                                {subItem.name}
                              </MenuItem>
                            )
                          )}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
            {isMobile ? (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ '& button': { m: 1 }, display: 'flex', alignItems: 'center' }}>
                <Button onClick={() => goToPage('/JoinClient')} variant="outlined" size="medium" color="inherit" sx={{ textTransform: 'none', color: '#f3f3f3' }}>
                  Join Us
                </Button>
                <Button onClick={() => goToPage('/JoinWriter')} variant="outlined" size="medium" color="inherit" sx={{ textTransform: 'none', color: '#f3f3f3' }}>
                  Request for Demo
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Box sx={{ p: 1, bgcolor: '#252B37', borderRadius: 1 }}>
          {currentMenu &&
            menuItems
              .find((item) => item.name === currentMenu)
              ?.subItems.map((subItem, index) =>
                subItem.subItems ? (
                  <NestedMenuItem key={index} item={subItem} handleClose={handleClose} />
                ) : (
                  <MenuItem
                    key={index}
                    onClick={() => goToPage(subItem.href)}
                    sx={{ color: '#f3f3f3', minWidth: 150 }}
                  >
                    {subItem.name}
                  </MenuItem>
                )
              )}
        </Box>
      </Popover>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            bgcolor: '#252B37',
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.name}>
              {renderMobileMenuItem(item, handleMobileExpand, mobileExpandedItem)}
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </ThemeProvider>
  );
}
