
import React, { useState } from 'react';
import {
    Box, TextField, Button, Typography, CircularProgress, Snackbar
} from '@mui/material';
import DynamicModal from '../../components/dynamicModal';
import useOrder from '../../hooks/useOrder';
import usePayments from '../../hooks/usePayment';
import { yupResolver } from '@hookform/resolvers/yup'
import { orderValidationSchema } from '../../schema/orderModal.schema'
import { useForm } from 'react-hook-form'
import type { ICart } from "../../types/cartType"
import type { IOrder_items } from '../../types/orderType';


type OrderModalProps = {
    open: boolean;
    onClose: () => void;
    items: IOrder_items[];
    totalAmount: number;
    setCart?: React.Dispatch<React.SetStateAction<ICart[]>>;
};

const OrderModal: React.FC<OrderModalProps> = ({ open, onClose, items, totalAmount, setCart }) => {
    const { createOrder, loading: orderLoading } = useOrder();
    const { createPayment, loading: paymentLoading } = usePayments();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(orderValidationSchema)
    });

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


    const onSubmit = async (data: any) => {
        try {
            const orderResponse: any = await createOrder({
                items,
                payment_reference: data.paymentReference
            });

            if (orderResponse.type === 'orders/create/fulfilled') {
                const order = orderResponse?.payload?.data;

                const paymentResponse = await createPayment({
                    order_id: order.id,
                    amount: totalAmount,
                    status: 'success',
                    payment_method: data.paymentMethod,
                    paid_at: new Date().toISOString()
                });

                if (paymentResponse.type === 'payment/create/fulfilled') {
                    setSnackbarMessage('Order and Payment Successful!');
                    setSnackbarOpen(true);

                    if (setCart) setCart([]);
                    reset();
                    onClose();
                } else {
                    setSnackbarMessage('Payment Failed');
                    setSnackbarOpen(true);
                }
            } else {

                setSnackbarMessage('You can buy product after the login!');
                setSnackbarOpen(true);
                reset();

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Payment Method"
                            fullWidth
                            {...register('paymentMethod')}
                            error={Boolean(errors.paymentMethod)}
                            helperText={errors.paymentMethod?.message}
                        />

                        <TextField
                            label="Payment Reference"
                            fullWidth
                            {...register('paymentReference')}
                            error={Boolean(errors.paymentReference)}
                            helperText={errors.paymentReference?.message}
                        />

                        <Typography variant="body1">
                            <strong>Total Product Amount:</strong> ₹{totalAmount}
                        </Typography>

                        <Button
                            variant="contained"
                            type="submit"
                            disabled={orderLoading === 'order/create' || paymentLoading === 'payment/create'}
                        >
                            {(orderLoading === 'order/create' || paymentLoading === 'payment/create')
                                ? <CircularProgress size={24} />
                                : 'Submit Order'}
                        </Button>
                    </Box>
                </form>
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
