import { useDispatch, useSelector } from "react-redux";
import { getSubcategoriesByCategoryIdAction } from "../store/actions/subcategory.action";
import { clearMessage } from "../store/reducers/subcategory.reducer";

const useSubcategory = () => {
    const dispatch = useDispatch();

    const {
        loading,
        error,
        message,
        apiName,
        alertType,
        subcategoriesByCategory
    } = useSelector((state) => state.subcategory);

    const getSubcategoryByCategory = async (category_id) => {
        await dispatch(getSubcategoriesByCategoryIdAction(category_id));
    };

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
        getSubcategoryByCategory,
        closeAlert,
    };
};

export default useSubcategory;
