import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/category.reducer'
import { fetchCategoryAction } from '../store/actions/category.action'

const useProduct = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
    } = useSelector((state) => state.category);

    const dispatch = useDispatch();


    const fetchCategory=async()=>{
        return await dispatch(fetchCategoryAction())
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
        closeAlert,
        fetchCategory

    }

}

export default useProduct