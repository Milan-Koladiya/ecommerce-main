// import React, { useState } from 'react';
// import {
//     Box, TextField, Button, Typography, CircularProgress
// } from '@mui/material';
// import DynamicModal from '../../components/dynamicModal';
// import useOrder from '../../hooks/useOrder';
// import usePayments from '../../hooks/usePayment';
// import Snackbar from '@mui/material/Snackbar';

// const OrderModal = ({ open, onClose, items, totalAmount, setCart, setProduct }) => {

//     const [paymentMethod, setPaymentMethod] = useState('');
//     const [paymentReference, setPaymentReference] = useState('');
//     const { createOrder, loading: orderLoading } = useOrder();
//     const { createPayment, loading: paymentLoading } = usePayments();

//     const handleSubmit = async () => {
//         try {
//             const orderResponse = await createOrder({
//                 items,
//                 payment_reference: paymentReference
//             });

//             if (orderResponse.type === 'orders/create/fulfilled') {
//                 const order = orderResponse.payload.data;

//                 const paymentResponse = await createPayment({
//                     order_id: order.id,
//                     amount: totalAmount,
//                     status: 'success',
//                     payment_method: paymentMethod,
//                     paid_at: new Date().toISOString()
//                 });

//                 if (paymentResponse.type === 'payment/create/fulfilled') {
                    
//                     alert('Order and Payment Successful!');
//                     if (setCart) setCart([]);
//                     setPaymentMethod('');
//                     setPaymentReference('')
//                     onClose();
//                 } else {
//                     alert('Payment Failed');
//                 }
//             } else {
//                 alert('Order Creation Failed');
//             }
//         } catch (err) {
//             console.log(err);
//             alert('Something went wrong');
//         }
//     };

//     return (
//         <DynamicModal show={open} onHide={onClose} title="Place Your Order">
              
            
//             <Box display="flex" flexDirection="column" gap={2}>
//                 <TextField
//                     label="Payment Method"
//                     value={paymentMethod}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     fullWidth
//                     required
//                 />
//                 <TextField
//                     label="Payment Reference"
//                     value={paymentReference}
//                     onChange={(e) => setPaymentReference(e.target.value)}
//                     fullWidth
//                     required
//                 />
//                 <Typography variant="body1">
//                     <strong>Total Amount:</strong> ₹{totalAmount}
//                 </Typography>
//                 <Button
//                     variant="contained"
//                     onClick={handleSubmit}
//                     disabled={orderLoading || paymentLoading}
//                 >
//                     {(orderLoading || paymentLoading) ? <CircularProgress size={24} /> : 'Submit Order'}
//                 </Button>
//             </Box>
//         </DynamicModal>
//     );
// };

// export default OrderModal;



import React, { useState } from 'react';
import {
    Box, TextField, Button, Typography, CircularProgress, Snackbar
} from '@mui/material';
import DynamicModal from '../../components/dynamicModal';
import useOrder from '../../hooks/useOrder';
import usePayments from '../../hooks/usePayment';

const OrderModal = ({ open, onClose, items, totalAmount, setCart, setProduct }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentReference, setPaymentReference] = useState('');
    const { createOrder, loading: orderLoading } = useOrder();
    const { createPayment, loading: paymentLoading } = usePayments();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = async () => {
        try {
            const orderResponse = await createOrder({
                items,
                payment_reference: paymentReference
            });

            if (orderResponse.type === 'orders/create/fulfilled') {
                const order = orderResponse.payload.data;

                const paymentResponse = await createPayment({
                    order_id: order.id,
                    amount: totalAmount,
                    status: 'success',
                    payment_method: paymentMethod,
                    paid_at: new Date().toISOString()
                });

                if (paymentResponse.type === 'payment/create/fulfilled') {
                    setSnackbarMessage('Order and Payment Successful!');
                    setSnackbarOpen(true);

                    if (setCart) setCart([]);

                    setPaymentMethod('');
                    setPaymentReference('');
                    onClose();
                } else {
                    setSnackbarMessage('Payment Failed');
                    setSnackbarOpen(true);
                }
            } else {
                setSnackbarMessage('Order Creation Failed');
                setSnackbarOpen(true);
            }
        } catch (err) {
            console.log(err);
            setSnackbarMessage('Something went wrong');
            setSnackbarOpen(true);
        }
    };

    return (
        <>
            <DynamicModal show={open} onHide={onClose} title="Place Your Order">
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        label="Payment Method"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Payment Reference"
                        value={paymentReference}
                        onChange={(e) => setPaymentReference(e.target.value)}
                        fullWidth
                        required
                    />

                    <Typography variant="body1">
                        <strong>Total Product Amount:</strong> ₹{totalAmount}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={orderLoading || paymentLoading}
                    >
                        {(orderLoading || paymentLoading) ? <CircularProgress size={24} /> : 'Submit Order'}
                    </Button>
                </Box>
            </DynamicModal>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </>
    );
};

export default OrderModal;
