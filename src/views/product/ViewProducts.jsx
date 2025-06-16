// import React, { useState, useEffect } from 'react';
// import useProduct from '../../hooks/useProduct';
// import {
//     Card,
//     CardActions,
//     CardContent,
//     CardMedia,
//     Button,
//     Typography,
//     Box
// } from '@mui/material';
// import { Link, Navigate, useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//     const { viewProduct } = useProduct();
//     const [product, setProduct] = useState([]);
//     const navigate = useNavigate()
    
//     useEffect(() => {
//         fetchProduct();
//     }, []);

//     const fetchProduct = async () => {
//         const res = await viewProduct();
//         setProduct(res.payload.data);
//     };


//     return (
//         <div>
//             <h2 style={{ marginLeft: '100px', fontFamily: 'serif', fontStyle: 'italic', marginTop: '30px' }}>Products</h2>
//             <Box sx={{ padding: 4 }}>
//                 <Box sx={{ marginLeft: '80px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
//                     {product.map((pro, index) => (
//                         <Card key={pro.id || index} sx={{ width: '280px', margin: 'auto' }}>
//                             <CardMedia sx={{ marginLeft: '15px', marginRight: '15px', height: 200 }} image={pro.image_url || '../../public/image/profile.png'} title={pro.name} />
//                             <CardContent>
//                                 <Typography gutterBottom variant="h6" fontWeight="bold" fontFamily={'serif'}>
//                                     {pro.name}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>
//                                     {pro.description || 'No description available'}
//                                 </Typography>
//                                 <Typography variant="body1" fontWeight="bold" >
//                                     ₹{pro.price}
//                                 </Typography>
//                             </CardContent>
//                             <CardActions>
//                                 <Button size="small" variant="contained" fullWidth onClick={() => navigate(`/product/${pro.id}`)}>
//                                     View More
//                                 </Button>
//                             </CardActions>
//                         </Card>
//                     ))}
//                 </Box>
//             </Box>
//         </div>
//     );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import useProduct from '../../hooks/useProduct';
import { Box, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductSidebar from '../../layout/ProductSidebar'; 

const Dashboard = () => {
    const { viewProduct, filterProduct } = useProduct();
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllProduct();
    }, []);

    const fetchAllProduct = async () => {
        const res = await viewProduct();
        if (res?.payload?.data) {
            setProduct(res.payload.data);
        }
    };

    const handleFilter = async (filterData) => {
        const res = await filterProduct(filterData);
        if (res?.payload?.data) {
            setProduct(res.payload.data);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <ProductSidebar onFilter={handleFilter} />
            <Box sx={{ flex: 1, padding: 4 }}>
                <Typography variant="h4" sx={{ mb: 2 }}>Products</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {product.map((pro, index) => (
                        <Card key={pro.id || index} sx={{ width: '280px', margin: 'auto' }} >
                            <CardMedia sx={{marginLeft:'15px',marginRight:'15px', height: 200 }} image={pro.image_url || '/image/profile.png'} />
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">{pro.name.charAt(0).toUpperCase()+pro.name.slice(1)}</Typography>
                                <Typography variant="body2">{pro.description || 'No description available'}</Typography>
                                <Typography variant="body1" fontWeight="bold">₹{pro.price}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button fullWidth variant="contained" onClick={() => navigate(`/product/${pro.id}`)}>
                                    View More
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
