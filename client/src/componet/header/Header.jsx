import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, MenuItem, Menu } from '@material-ui/core';
import { AccountCircle, ShoppingCart, Home as HomeIcon, ContactPhone, AttachMoney } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, selectCartCount } from '../../store/CartSlice';
import logo from "../../../public/images/logo.png"
import { Box } from '@mui/material';
const Header = ({ updateCartCount }) => {
    const dispatch = useDispatch();
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
            position="fixed" style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#6f6e80' }}>
            <Toolbar>

                <Box
                    className=' absolute  left-[120px] md:left-[30px] lg:left-[50px] md:flex lg:flex'
                    variant="h6" style={{ flexGrow: 1, color: "black" }}>
                    <Link
                        className='cursor-pointer'
                        to="/">
                        <img
                            className=' w-[90px] h-[60px]'
                            src={logo} alt="logo" />

                    </Link>

                </Box>

                <div className='hidden md:flex lg:flex absolute left-[230px] justify-between list-none text-black'>
                    <li className='mx-5 text-[23px] font-medium'>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li className='mx-5 text-[23px] font-medium'>
                        <Link to="/pricing">
                            Pricing
                        </Link>
                    </li>

                    <li className='mx- text-[23px] font-medium'>
                        <Link to="/Works">
                            About
                        </Link>
                    </li>
                    <li className='mx-5 text-[23px] font-medium'>
                        <Link to="/Works">
                            Our Work
                        </Link>
                    </li>

                </div>
                <div className='absolute top-2 right-6 text-black'>
                    <Link to="/account">
                        <IconButton
                            color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </Link>
                    <Link to="/cart">
                        <IconButton color="inherit">
                            <Badge badgeContent={cartCount} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </Link>
                </div>

                {isMobile && (
                    <div className='md:hidden lg:hidden'>
                        <IconButton edge="end" color="black"
                            onClick={handleMenu}>
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
                            <MenuItem onClick={handleClose}>
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
                            <MenuItem onClick={handleClose}>
                                <Link to="/Works">
                                    About
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