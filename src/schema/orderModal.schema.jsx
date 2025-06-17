import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  paymentMethod: yup.string().required('payment Method is required'),
  paymentReference: yup.string().required('Payment Reference is required'),
  });

