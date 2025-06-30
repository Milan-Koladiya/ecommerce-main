import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/order.reducer'
import { fetchOrderAction,createOrderAction } from '../store/actions/order.action'
import type { AppDispatch, RootState } from '../store';
import type { IOrder,createOrderType } from '../types/order.type';

const useOrder = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
    } = useSelector((state:RootState) => state.order);

    const dispatch = useDispatch<AppDispatch>();


    const viewOrderOfUser=async()=>{
        return await dispatch(fetchOrderAction())
    }


    const createOrder = async (orderData:createOrderType) => {
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