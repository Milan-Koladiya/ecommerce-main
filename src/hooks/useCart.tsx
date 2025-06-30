import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, errorMessage } from '../store/reducers/cart.reducers'
import { addToCartAction, updateCartQuantityAction, getCartItemsAction, getCurrentUserCartItemsAction, deleteItemFromCartAction } from '../store/actions/cart.action'
import type { AppDispatch, RootState } from '../store';
import type { ICart } from '../types/cartType';
import type { EditCartType } from '../types/cartType'
const useProduct = () => {
    const {
        loading,
        message,
        error,
        apiName,
        alertType,
        emailStatus,
    } = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch<AppDispatch>();

    const updateCartQuantity = async ({ product_id, body }: EditCartType) => {
        return await dispatch(updateCartQuantityAction({ product_id, body }))
    }

    const getCartItems = async () => {
        return await dispatch(getCartItemsAction())
    }

  const addToCart = async (cartData: ICart) => {
    return await dispatch(addToCartAction(cartData));
  };
    const viewCartOfUser = async () => {
        return await dispatch(getCurrentUserCartItemsAction())
    }

    const deleteItemFromCart = async (id:{id:string}) => {
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