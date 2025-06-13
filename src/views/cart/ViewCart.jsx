import React, { useState, useEffect } from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import DynamicModal from '../../components/dynamicModal';
import EditCart from './EditCart';
import Loader from '../../components/common/loader';
import OrderModal from '../order/CreateOrder';
import '../../css/box.css'

const ViewCart = () => {
    const { viewCartOfUser } = useCart();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCartItem, setSelectedCartItem] = useState(null);
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const res = await viewCartOfUser();
            if (res?.payload?.data?.length > 0) {
                setCart(res.payload.data);
            } else {
                setCart([]);
            }
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (item) => {
        setSelectedCartItem(item);
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        setSelectedCartItem(null);
    };

    const handleCartUpdated = async () => {
        await fetchCart();
    };

    const handlePlaceOrder = () => {
        const itemsToOrder = cart.map((item) => ({
            product_id: item.product.id,
            price: item.product.price*item.quantity,
            quantity:item.quantity
        }));
        setSelectedItems(itemsToOrder);
        setOpenOrderModal(true);
    };



    return (
        <div>
            <h2 style={{ marginLeft: '100px', fontFamily: 'serif', fontStyle: 'italic', marginTop: '30px' }}>
                Products
            </h2>
            <Box className='boxCart'>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Typography sx={{ marginLeft: '100px', color: 'red' }}>
                        Failed to load cart.
                    </Typography>
                ) : cart.length === 0 ? (
                    <Typography sx={{ marginLeft: '100px', fontFamily: 'serif', fontSize: 20 }}>
                        No products found in the cart.
                    </Typography>
                ) : (
                    <Box sx={{ marginLeft: '40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                        {cart.map((cartItem, index) => (
                            <Card key={cartItem.id || index} sx={{ width: '280px' }}>
                                <Typography
                                    marginLeft='230px'
                                    color='#ad1457'
                                    gutterBottom
                                    variant="h6"
                                    fontWeight="bold"
                                    fontFamily={'serif'}
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => handleOpenModal(cartItem)}
                                >
                                    Edit
                                </Typography>

                                <CardMedia
                                    sx={{ marginLeft: '10px', marginRight: '10px', height: 130 }}
                                    image={cartItem.product.image_url || '/image/profile.png'}
                                    title={cartItem.product.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" fontWeight="bold" fontFamily={'serif'}>
                                        {cartItem.product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ minHeight: 30 }}>
                                        {cartItem.product.description || 'No description available'}
                                    </Typography>
                                    <Typography variant="body1" fontWeight="bold" color="text.secondary" sx={{ minHeight: 30 }}>
                                        Quantity: {cartItem.quantity}
                                    </Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        ₹{cartItem.product.price}
                                    </Typography>
                                </CardContent>
                            </Card>

                        ))}
                    </Box>
                )}

            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end',mb:10,mr:5, mt: 4 }}>
                <Button variant="contained" size="large" onClick={handlePlaceOrder}>
                    Place Order
                </Button>
            </Box>

            <OrderModal
                open={openOrderModal}
                onClose={() => setOpenOrderModal(false)}
                items={selectedItems}
                totalAmount={selectedItems.reduce((sum, item) => sum + item.price, 0)}
            />

            {selectedCartItem && (
                <DynamicModal show={openModal} onHide={handleClose} title="Edit Cart">
                    <EditCart cartItem={selectedCartItem} onClose={handleClose} onCartUpdated={handleCartUpdated} />
                </DynamicModal>
            )}
        </div>
    );
};

export default ViewCart;
