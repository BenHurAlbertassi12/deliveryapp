import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../Utils/useLocalStorage';

function OrderCard({ order }) {
  const { id, status, saleDate, totalPrice, deliveryAddress } = order;
  const [user] = useLocalStorage('user');
  const navigate = useNavigate();

  const handleButton = (event) => {
    event.preventDefault();
    navigate(`/${user.role}/orders/${id}`);
  };

  return (
    <section>
      <button
        data-testid={ `${user.role}_orders__element-order-id-${id}` }
        type="button"
        onClick={ (event) => handleButton(event) }
      >
        <div>
          <p>Pedido</p>
          <p>{id}</p>
        </div>
        <div data-testid={ `${user.role}_orders__element-delivery-status-${id}` }>
          <p>{status}</p>
        </div>
        <div data-testid={ `${user.role}_orders__element-order-date-${id}` }>
          <p>{new Date(saleDate).toLocaleDateString('en-GB')}</p>
        </div>
        <div data-testid={ `${user.role}_orders__element-card-price-${id}` }>
          <p>{totalPrice.replace('.', ',')}</p>
        </div>
        {deliveryAddress && (
          <div data-testid={ `seller_orders__element-card-address-${id}` }>
            <p>{deliveryAddress}</p>
          </div>
        )}
      </button>
    </section>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.number,
    deliveryAddress: PropTypes.string,
  }).isRequired,
};

export default OrderCard;
