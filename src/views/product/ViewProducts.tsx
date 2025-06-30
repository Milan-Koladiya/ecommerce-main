
import React, { useEffect, useState } from 'react';
import useProduct from '../../hooks/useProduct';
import { Box, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductSidebar from '../../layout/ProductSidebar';
import type { IProduct } from '../../types/product.types';

const Dashboard = () => {
    const { viewProduct, filterProduct } = useProduct();
    const [product, setProduct] = useState<IProduct[]>([]);
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllProduct();
    }, []);

    const fetchAllProduct = async () => {
        const res: any = await viewProduct();
        if (res?.payload?.data) {
            setProduct(res.payload.data);
            console.log(product.length)
        }
    };

    const handleFilter = async (filterData: IProduct) => {
        const res: any = await filterProduct(filterData);
        if (res?.payload?.data) {
            setProduct(res.payload.data);
            setShowAll(false);
        }
    };

    const visibleProducts = showAll ? product : product.slice(0, 8);

    return (
        <Box sx={{ display: 'flex' }}>
            <ProductSidebar onFilter={handleFilter} />
            <Box sx={{ flex: 1, padding: 3}}>
            <h2 style={{ textAlign: 'center', margin: '10px 10px 40px', fontFamily: 'serif', fontStyle: 'italic' }}>
                Products
            </h2>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {product.length > 0 ? visibleProducts.map((pro, index) => (
                        <Card key={pro.id || index} sx={{ width: '280px', margin: 'auto' }}>
                            <CardMedia sx={{ marginLeft: '15px', marginRight: '15px', height: 200 }} image={pro.image_url || '/image/profile.png'} />
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">
                                    {pro.name.charAt(0).toUpperCase() + pro.name.slice(1)}
                                </Typography>
                                <Typography variant="body2">
                                    {pro.description || 'No description available'}
                                </Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    ₹{pro.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button fullWidth variant="contained" onClick={() => navigate(`/product/${pro.id}`)}>
                                    View More
                                </Button>
                            </CardActions>
                        </Card>
                    )) : (<Box sx={{width:'400px'}}>
                        <Typography variant="h6" sx={{ textAlign: 'center', marginTop:'300px'}}>
                        No product found!.
                    </Typography>
                    </Box>)}
                </Box>

                {product.length > 8 && !showAll && (
                    <Box mt={4} display="flex" justifyContent="center">
                        <Button variant="outlined" onClick={() => setShowAll(true)}>
                            Show More...
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Dashboard;
