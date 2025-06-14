import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Divider, Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import useCart from '../../hooks/useCart'
import Loader from '../../components/common/loader';
import Alert from '../../components/common/alert';
import AddToCart from '../../views/cart/AddToCart'
import '../../css/box.css';
import Snackbar from '@mui/material/Snackbar';

const ViewSingleProduct = () => {
    const { id } = useParams();
    const { viewProductById } = useProduct();
    const { apiName, alertType, message, addToCart, closeAlert } = useCart()
    const [product, setProduct] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await viewProductById(id);
            setProduct(res.payload.data);
        })();
    }, [id]);

    useEffect(() => {
        if (apiName === 'cart/addToCart' && message) {
            const timer = setTimeout(() => {
                closeAlert();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message, apiName, closeAlert]);

    if (!product) return <Loader />;

    return (
        <div>
            <h2 style={{ textAlign:'center', fontFamily: 'serif', fontStyle: 'italic', marginTop: '30px' }}>Product</h2>

            {apiName === 'cart/addToCart' && message && (
                <Box sx={{ mx: 'auto', width: 'fit-content', mt: 2 }}>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        message={message+"!"}
                    />
                    {/* <Alert type={alertType} message={message} /> */}
                </Box>
            )}

            <Box className="box" marginLeft={'500px'} marginTop={'50px'} p={5} borderRadius={'10px'} bgcolor={'#f8f9fa'}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>

                        <Box display="flex" flexDirection="column" alignItems="center">
                            <img src={product.image_url} alt={product.name} style={{ width: "100%", maxWidth: 600, borderRadius: 8 }} />
                        </Box>

                        <Box marginTop={'20px'} display="flex" gap={2} mb={3}>
                            <AddToCart product={product} />
                            <Button variant="contained" color="secondary" style={{ padding: '10px 90px ' }}>
                                Buy Now
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography marginLeft='10px' marginTop={'40px'} variant="h5" fontWeight="bold">
                            {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                        </Typography>

                        <Typography variant="h6" color="green">
                            ₹{product.price}
                            <Typography variant="body2" component="span" sx={{ textDecoration: "line-through", ml: 1, color: "gray" }}> ₹{Math.floor(product.price * 1.05)} </Typography>
                            <Typography component="span" color="error" sx={{ ml: 1 }}> 5% off </Typography>
                        </Typography>

                        <Box mt={1} mb={2}> <Rating value={4} readOnly size="small" /> <Typography variant="caption">(4300 reviews)</Typography></Box>

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h6" gutterBottom> Product Details </Typography>

                        <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}> {product.description} </Typography>

                        <Typography variant="body2" sx={{ mt: 2 }}> <strong>Country of Origin:</strong> India </Typography>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default ViewSingleProduct;
