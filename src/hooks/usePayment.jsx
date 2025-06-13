import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/payment.reducers'
import { createPaymentAction } from '../store/actions/payment.action'

const usePayments = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
    } = useSelector((state) => state.payments);

    const dispatch = useDispatch();

    const createPayment = async (paymentData) => {
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