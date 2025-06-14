import { useDispatch, useSelector } from "react-redux";
import { getSubcategoriesByCategoryIdAction,fetchSubcategoryAction } from "../store/actions/subcategory.action";
import { clearMessage } from "../store/reducers/subcategory.reducer";

const useSubcategory = () => {
    const dispatch = useDispatch();

    const {
        loading,
        error,
        message,
        apiName,
        alertType,
        subcategoriesByCategory,
        subcategories
    } = useSelector((state) => state.subcategory);

    const getSubcategoryByCategory = async (category_id) => {
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
        subcategoriesByCategory,
        subcategories,
        getSubcategoryByCategory,
        viewSubcategory,
        closeAlert,
    };
};

export default useSubcategory;
