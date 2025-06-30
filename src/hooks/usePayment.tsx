import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/payment.reducers'
import { createPaymentAction } from '../store/actions/payment.action'
import type { AppDispatch, RootState } from '../store';
import type { IPayment } from '../types/payment.type';

const usePayments = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
    } = useSelector((state:RootState) => state.payments);

    const dispatch = useDispatch<AppDispatch>();

    const createPayment = async (paymentData:IPayment) => {
        return await dispatch(createPaymentAction(paymentData));
    };


    const closeAlert = () => {
        dispatch(clearMessage());
    };


    return {
        loading,
        message,
        error,
        apiName,
        alertType,
        closeAlert,
        createPayment

    }

}

export default usePayments