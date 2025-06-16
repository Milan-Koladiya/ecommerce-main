import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import Alert from '../../components/common/alert';
import useCart from '../../hooks/useCart';
import { useDispatch } from 'react-redux';
import { errorMessage } from '../../store/reducers/cart.reducers';
import { useAuth } from '../../context/AuthContex';
import { useNavigate } from 'react-router-dom';

const AddToCart = ({ product }) => {
    const {
        getCartItems,
        addToCart,
        message,
        alertType,
        closeAlert,
        apiName,
    } = useCart();

    const [cartItems, setCartItems] = useState([]);
    const dispatch = useDispatch();
    const { authUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            if (authUser) {
                const res = await getCartItems();
                setCartItems(res.payload?.data || []);
            }
        };
        fetchCart();
    }, [authUser]);

    const handleAddToCart = async () => {
        if (!authUser) {
            navigate('/login');
            return
        }

        const existing = cartItems.find(item => item.product_id === product.id);

        if (!existing) {
            await addToCart({ product_id: product.id, quantity: 1 });
        } else if (existing.quantity < 10) {
            await addToCart({
                product_id: product.id,
                quantity: existing.quantity + 1,
            });
            
        } else {
            dispatch(
                errorMessage({
                    alertType: 'danger',
                    apiName: 'cart/addToCart',
                    message: 'You cannot add more than 10 product.',
                })
            );
        }
    };

    return (
        
            <Button onClick={handleAddToCart} variant="outlined" color="primary" style={{padding:'5px 80px '}}>
                Add To Cart
            </Button>
    
    );
};

export default AddToCart;
