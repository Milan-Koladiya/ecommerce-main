import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/cart.reducers'
import { addToCartAction, updateCartQuantityAction, getCartItemsAction, getCurrentUserCartItemsAction, deleteItemFromCartAction } from '../store/actions/cart.action'

const useProduct = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus,
    } = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    const updateCartQuantity = async ({ product_id, body }) => {
        return await dispatch(updateCartQuantityAction({ product_id, body }))
    }

    const getCartItems = async () => {
        return await dispatch(getCartItemsAction())
    }

    const addToCart = async (id) => {
        return await dispatch(addToCartAction(id))
    }

    const viewCartOfUser = async () => {
        return await dispatch(getCurrentUserCartItemsAction())
    }

    const deleteItemFromCart = async (id) => {
        return await dispatch(deleteItemFromCartAction(id))
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
        addToCart,
        updateCartQuantity,
        getCartItems,
        viewCartOfUser,
        deleteItemFromCart

    }

}

export default useProduct