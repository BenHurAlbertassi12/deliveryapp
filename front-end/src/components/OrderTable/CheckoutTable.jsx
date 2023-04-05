import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import context from '../../context/Context';
import useLocalStorage from '../../Utils/useLocalStorage';
import Entrega from './CheckoutEntrega';

function OrderTable({ page }) {
  const { cart, totalValues, altQuantidade, order } = useContext(context);
  const [user] = useLocalStorage('user');
  const { role: userType } = user;
  const [listProduct, setlistProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(totalValues());
  }, [cart, totalValues]);

  useEffect(() => {
    setlistProduct(page === 'checkout' ? cart : order);
  }, [cart, order, page]);

  const removeIndex = (product) => {
    altQuantidade({ ...product, quantity: 0 });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
            {page === 'checkout' && <th>Remover Item</th>}
          </tr>
        </thead>
        <tbody>
          {listProduct.map((item, index) => (
            <tr key={ item.id }>
              <td
                data-testid={
                  `${userType}_${page}__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>

              <td>
                <p
                  data-testid={
                    `${userType}_${page}__element-order-table-name-${index}`
                  }
                >
                  {item.name}
                </p>

                <td
                  data-testid={
                    `${userType}_${page}__element-order-table-quantity-${index}`
                  }
                >
                  {item.quantity}
                </td>

                <p
                  data-testid={
                    `${userType}_${page}__element-order-table-unit-price-${index}`
                  }
                >
                  {item.price.replace('.', ',')}
                </p>
              </td>

              {page === 'checkout' && (
                <td>
                  <button
                    data-testid={
                      `${userType}_${page}__element-order-table-remove-${index}`
                    }
                    type="button"
                    onClick={ () => removeIndex(item) }
                  >
                    Remove
                  </button>
                </td>
              )}

              <td
                data-testid={
                  `${userType}_${page}__element-order-table-sub-total-${index}`
                }
              >
                {(item.quantity * item.price).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {listProduct.length > 0 && (
          <p>
            Total: R$
            {' '}
            <span
              data-testid={ `${userType}_${page}__element-order-total-price` }
            >
              {page === 'checkout'
                ? totalPrice.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })
                : listProduct[0].totalPrice.replace('.', ',')}
            </span>
          </p>
        )}
      </div>
      <Entrega />
    </div>
  );
}

OrderTable.propTypes = {
  page: PropTypes.string.isRequired,
};

export default OrderTable;
