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
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart'

const ViewCart = () => {
    const { viewCartOfUser } = useCart();
    const [product, setProduct] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        const res = await viewCartOfUser();
        console.log("cart data",res.payload.data)
        setProduct(res.payload.data);
    };

    return (
        <div>
            <h2 style={{ marginLeft: '100px', fontFamily: 'serif', fontStyle: 'italic', marginTop: '30px' }}>Products</h2>
            <Box sx={{ padding: 4 }}>
                <Box sx={{ marginLeft: '80px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                    {product.map((pro, index) => (
                        <Card key={pro.id || index} sx={{ width: '280px', margin: 'auto' }}>
                            <CardMedia sx={{ marginLeft: '15px', marginRight: '15px', height: 200 }} image={pro.image_url || '../../public/image/profile.png'} title={pro.name} />
                            <CardContent>
                                <Typography gutterBottom variant="h6" fontWeight="bold" fontFamily={'serif'}>
                                    {pro.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>
                                    {pro.description || 'No description available'}
                                </Typography>
                                <Typography variant="body1" fontWeight="bold" >
                                    ₹{pro.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant="contained" fullWidth onClick={() => navigate(`/product/${pro.id}`)}>
                                    View More
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Box>
        </div>
    )
}

export default ViewCart
