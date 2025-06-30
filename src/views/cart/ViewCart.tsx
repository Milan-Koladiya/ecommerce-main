import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import useCart from '../../hooks/useCart';
import DynamicModal from '../../components/dynamicModal';
import EditCart from './EditCart';
import Loader from '../../components/common/loader';
import OrderModal from '../order/CreateOrder';
import '../../css/box.css'
import ConfirmBox from '../../components/confirmBox'
import type { ICart } from '../../types/cartType';


interface orderItemType {
    product_id: string,
    price: number,
    quantity: number
}

const ViewCart = () => {
    const { viewCartOfUser, deleteItemFromCart } = useCart();
    const [cart, setCart] = useState<ICart[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCartItem, setSelectedCartItem] = useState(null);
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState<orderItemType[]>([]);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [selectedId, setSelectedId] = useState<string|null>(null);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const res: any = await viewCartOfUser();
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

    const handleOpenModal = (item: any) => {
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

        const itemsToOrder = cart.map((item ) => ({
            product_id: item.product?.id ?? "",
            price: (item.product?.price ?? 0) * item.quantity,
            quantity: item.quantity
        }));
        setSelectedItems(itemsToOrder);
        setOpenOrderModal(true);
    };

    const handleDelete = async (id:any) => {
        setSelectedId(id);
        setConfirmVisible(true);
    }

    const handleConfirmDelete = async () => {
            if (!selectedId) return;

        setConfirmVisible(false)
        const res = await deleteItemFromCart({id:selectedId})
        fetchCart()
        //   toast.success("Category deleted successfully");

    }

    return (
        <div>
            <h2 style={{ textAlign: 'center', margin: '20px 150px', fontFamily: 'serif', fontStyle: 'italic', marginTop: '30px' }}>
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
                    <Box sx={{ marginLeft: '22px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                        {cart.map((cartItem, index) => (
                            <Card key={cartItem.id || index} sx={{ width: '280px' }}>
                                <Typography marginLeft='230px' color='#ad1457' gutterBottom variant="h6" fontWeight="bold" fontFamily={'serif'} sx={{ cursor: 'pointer' }} onClick={() => handleOpenModal(cartItem)}>
                                    Edit
                                </Typography>

                                <CardMedia
                                    sx={{ marginLeft: '10px', marginRight: '10px', height: 130 }}
                                    image={cartItem.product?.image_url || '/image/profile.png'}
                                    title={cartItem.product?.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" fontWeight="bold" fontFamily={'serif'}>
                                        {cartItem.product?.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ minHeight: 30 }}>
                                        {cartItem.product?.description || 'No description available'}
                                    </Typography>
                                    <Typography variant="body1" fontWeight="bold" color="text.secondary" sx={{ minHeight: 30 }}>
                                        Quantity: {cartItem.quantity}
                                    </Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        ₹{cartItem.product?.price}
                                    </Typography>

                                </CardContent>
                                <Button onClick={() => handleDelete(cartItem.product?.id)} >
                                    X Remove
                                </Button>
                            </Card>

                        ))}
                    </Box>
                )}

            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 10, mr: 23, mt: 4 }}>
                {cart.length > 0 ? <Button variant="contained" size="large" onClick={handlePlaceOrder}>
                    Place Order
                </Button> : null}
            </Box>

            <ConfirmBox
                show={confirmVisible}
                onClose={() => setConfirmVisible(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Cart"
                message="Are you sure you want to  delete this Cart Items?" />

            <OrderModal
                setCart={setCart}
                open={openOrderModal}
                onClose={() => setOpenOrderModal(false)}
                items={selectedItems}
                totalAmount={Array.isArray(selectedItems) ? selectedItems.reduce((sum, item) => sum + item.price, 0) : 0}
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
