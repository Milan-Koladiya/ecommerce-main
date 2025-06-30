import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/category.reducer'
import { fetchCategoryAction } from '../store/actions/category.action'
import type { AppDispatch, RootState } from '../store';

const useCategory= () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
    } = useSelector((state:RootState) => state.category);

    const dispatch = useDispatch<AppDispatch>();


    const viewCategory=async()=>{
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
        viewCategory

    }

}

export default useCategory