import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/order.reducer'
import { fetchOrderAction,createOrderAction } from '../store/actions/order.action'

const useOrder = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
    } = useSelector((state) => state.order);

    const dispatch = useDispatch();


    const viewOrderOfUser=async()=>{
        return await dispatch(fetchOrderAction())
    }


    const createOrder = async (orderData) => {
        return await dispatch(createOrderAction(orderData));
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
        createOrder,
        viewOrderOfUser

    }

}

export default useOrder