import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box
} from '@mui/material';
import useOrder from '../../hooks/useOrder';
import type { IOrder, IOrder_items } from '../../types/orderType';

const ViewOrder = () => {
    const { viewOrderOfUser } = useOrder();
    const [order, setOrder] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {

            const res: any = await viewOrderOfUser();
            setOrder(res.payload);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setOrder([]);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <h2 style={{ textAlign: 'center', margin: '20px 150px', fontFamily: 'serif', fontStyle: 'italic', marginTop: '30px' }}>
                Products
            </h2>
            <Box sx={{ padding: 4 }}>
                {loading ? (
                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '50px' }}>
                        Loading orders...
                    </Typography>
                ) : order.length === 0 ? (
                    <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '50px' }}>
                        No order found.
                    </Typography>
                ) : (
                    <Box sx={{ marginLeft: '80px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                        {order.map((orderItem, index) => (
                            orderItem.order_items?.map((item: IOrder_items, subIndex:any) => (
                                <Card key={item.id || `${index}-${subIndex}`} sx={{ width: '280px', margin: 'auto' }}>
                                    <CardMedia
                                        sx={{ marginLeft: '15px', marginRight: '15px', height: 200 }}
                                        image={item.product?.image_url || '/image/profile.png'}
                                        title={item.product?.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" fontWeight="bold" fontFamily={'serif'}>
                                            {item.product?.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ minHeight: 25 }}>
                                            {item.product?.description || 'No description available'}
                                        </Typography>

                                        <Typography variant="body1">
                                            Qty : {item.quantity}
                                        </Typography>

                                        <Typography variant="body1" marginBlockStart={'10px'} fontWeight="bold">
                                            ₹{item.price}
                                        </Typography>

                                        <Typography variant="body1" marginBlockStart={'10px'} fontWeight="bold">
                                            {orderItem.status}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                        ))}
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default ViewOrder;
