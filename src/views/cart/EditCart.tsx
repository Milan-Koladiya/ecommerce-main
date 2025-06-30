import React, { useState } from 'react';
import {
    CardMedia,
    Button,
    Typography,
    Box
} from '@mui/material';
import useCart from '../../hooks/useCart';

const EditCart = ({ cartItem, onClose, onCartUpdated }:any) => {
    const { updateCartQuantity } = useCart();
    const [quantity, setQuantity] = useState<number>(cartItem.quantity || 1);
    const [loading, setLoading] = useState(false);

    const handleIncreaseQuantity = () => {
        if (quantity < 10) setQuantity(prev => prev + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            await updateCartQuantity({
                product_id: cartItem.product.id,
                body: { quantity }
            });
            if (onCartUpdated) onCartUpdated();

            if (onClose) onClose();
        } catch (error) {
            console.error("Failed to update:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '10px', margin: '10px' }}>
            <CardMedia
                sx={{ marginLeft: '10px', marginRight: '300px', height: 100 }}
                image={cartItem.product.image_url || '/image/profile.png'}
                title={cartItem.product.name}
            />
            <Typography marginTop="10px" marginLeft="18px" gutterBottom variant="h6" fontWeight="bold" fontFamily="serif">
                {cartItem.product.name}
            </Typography>
            <Typography marginLeft="18px" variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>
                {cartItem.product.description || 'No description available'}
            </Typography>
            <Box display="flex" alignItems="center" marginLeft="18px"  marginBlockEnd={'15px'}>
                <Typography variant="body1" fontWeight="bold" color="text.secondary" sx={{ marginRight: 1 }}>
                    Qty:
                </Typography>

                <Button variant="outlined" size="small" onClick={handleDecreaseQuantity} sx={{ minWidth: '36px', padding: '4px', fontWeight: 'bold' }}>-</Button>

                <Typography variant="body1" fontWeight="bold" sx={{ marginX: 2, minWidth: '24px', textAlign: 'center' }}>
                    {quantity}
                </Typography>

                <Button variant="outlined" size="small" onClick={handleIncreaseQuantity} sx={{ minWidth: '36px', padding: '4px', fontWeight: 'bold' }}> + </Button>
            </Box>

            <Typography marginLeft="18px" variant="body1" fontWeight="bold">
                ₹{cartItem.product.price}
            </Typography>

            <div style={{ marginTop: '20px', marginLeft: '18px' }}>
                <Button variant="contained" color="primary" onClick={handleUpdate} disabled={loading}>
                    {loading ? 'Updating...' : 'Save Changes'}
                </Button>
                <Button style={{ marginLeft: '10px' }} onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default EditCart;
