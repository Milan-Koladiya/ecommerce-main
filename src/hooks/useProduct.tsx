import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/product.reducers'
import { fetchProductAction, fetchSingleProductAction, filterProductAction } from '../store/actions/product.action'
import type { AppDispatch, RootState } from '../store';
import { IProduct } from '../types/product.types';

const useProduct = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus,
    } = useSelector((state: RootState) => state.product);

    const dispatch = useDispatch<AppDispatch>();

    const viewProduct = async () => {
        return await dispatch(fetchProductAction())
    }

    const viewProductById = async (id:any) => {
        return await dispatch(fetchSingleProductAction(id))
    }

    const filterProduct = async (data: IProduct) => {
        return await dispatch(filterProductAction(data))
    }

    const closeAlert = () => {
        dispatch(clearMessage());
    };


    return {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus,
        closeAlert,
        viewProduct,
        viewProductById,
        filterProduct
    }

}

export default useProduct