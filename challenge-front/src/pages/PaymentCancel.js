import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Display toast message
 * @param { String } message Toast message
 * @param { String } type Toast type
 */
const setToast = (message, type) => {
  toast[type](message, {
    position: 'top-right',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

function PaymentCancel() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/cart');
    setTimeout(() => {
      setToast('Paiement annulé ou échoué, veuillez réessayer', 'error');
    }, 500);
  }, [navigate]);
}

export default PaymentCancel;
