import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/product.reducers'
import { fetchProductAction,fetchSingleProductAction} from '../store/actions/product.action'

const useProduct = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus,
    } = useSelector((state) => state.product);

    const dispatch = useDispatch();

    const viewProduct = async () => {
        return await dispatch(fetchProductAction())
    }

    const viewProductById=async(id)=>{
        return await dispatch(fetchSingleProductAction(id))
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
        viewProductById
    }

}

export default useProduct