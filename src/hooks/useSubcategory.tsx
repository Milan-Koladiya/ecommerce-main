import { useDispatch, useSelector } from "react-redux";
import { getSubcategoriesByCategoryIdAction,fetchSubcategoryAction } from "../store/actions/subcategory.action";
import { clearMessage } from "../store/reducers/subcategory.reducer";
import type { AppDispatch, RootState } from "../store";

const useSubcategory = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        loading,
        error,
        message,
        apiName,
        alertType,
    } = useSelector((state:RootState) => state.subcategory);

    const getSubcategoryByCategory = async (category_id:{category_id:string}) => {
        return await dispatch(getSubcategoriesByCategoryIdAction(category_id));
    };

    const viewSubcategory=async()=>{
        return await dispatch(fetchSubcategoryAction())
        
    }

    const closeAlert = () => {
        dispatch(clearMessage());
    };

    return {

        loading,
        error,
        message,
        apiName,
        alertType,
        getSubcategoryByCategory,
        viewSubcategory,
        closeAlert,
    };
};

export default useSubcategory;
