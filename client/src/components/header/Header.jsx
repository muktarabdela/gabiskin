import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu } from '@material-ui/core';
import { ShoppingCart, Home as HomeIcon, } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { selectCartCount } from '../../store/CartSlice';
import { Box } from '@mui/material';
import AccountLink from '../Account/AccountLink';
import { useSelector } from 'react-redux';
import Logo from "../../../public/images/logo.png"


const Header = () => {
    const cartCount = useSelector(selectCartCount);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <AppBar
            className='pl-10 h-[60px] '
            position="fixed" style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
            <Toolbar className=''>

                <Box
                    className=' absolute  left-[90px] md:left-[30px] lg:left-[50px] mx-auto md:flex lg:flex'
                    variant="h6" style={{ flexGrow: 1, color: "black" }}>
                    <Link
                        className='cursor-pointer'
                        to="/">
                        <img
                            className=' w-[3.5em] h-[3em] mt-2'
                            src={Logo} alt="logo" />

                    </Link>

                </Box>

                <div className='hidden md:flex lg:flex absolute left-[230px] justify-between list-none text-black'>
                    <li className='mx-5 text-[1.2em] font-medium'>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li className='mx-5 text-[1.2em] font-medium'>
                        <Link to="/pricing">
                            Pricing
                        </Link>
                    </li>
                    <li className='mx-5 text-[1.2em] font-medium'>
                        <Link to="/Works">
                            Our Work
                        </Link>
                    </li>

                </div>
                <div className='absolute top-2 right-[1em] md:right-[8em]
                lg:right-[10em]
                text-black'>
                    <AccountLink />
                    <Link to="/cart">
                        <IconButton color="inherit">
                            <Badge badgeContent={cartCount} color="secondary" overlap="rectangular">
                                <ShoppingCart />
                            </Badge>

                        </IconButton>
                    </Link>
                </div>

                {isMobile && (
                    <div className='md:hidden lg:hidden'>
                        <IconButton edge="end" color="primary" onClick={handleMenu}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={handleClose}>
                                <Link to="/">
                                    Home
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link to="/pricing">
                                    Pricing
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link to="/Works">
                                    Works
                                </Link>
                            </MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>


    );
};

export default Header;