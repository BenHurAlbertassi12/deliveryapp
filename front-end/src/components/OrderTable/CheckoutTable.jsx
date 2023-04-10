import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import context from '../../context/Context';
import useLocalStorage from '../../Utils/useLocalStorage';

function OrderTable({ page }) {
  const { getCart, getOrder, totalValues, altQuantidade } = useContext(context);
  const [user] = useLocalStorage('user');
  const { role: userType } = user;
  const [listProduct, setlistProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const setCartStorage = useLocalStorage('cart')[1];

  useEffect(() => {
    const cart = getCart();
    // const order = getOrder();
    setTotalPrice(totalValues());
    setlistProduct(cart);
    setCartStorage(listProduct);
  }, [getCart, getOrder, totalValues, page, listProduct, setCartStorage]);

  // useEffect(() => {
  //   setlistProduct(page === 'checkout' ? cart : order);
  //   console.log(listProduct);
  // }, [cart, order, page]);

  const removeIndex = (product) => {
    altQuantidade({ ...product, quantity: 0 });
  };

  if (!listProduct || listProduct.length > 0) {
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
              {page === 'checkout' && <th>Remover Item</th>}
            </tr>
          </thead>
          <tbody>
            { listProduct.map((item, index) => {
              if (item.quantity === 0) return ''; // Adicionei para que quando, algum item tiver 0 em sua quantidade, nao seja renderizado
              return (
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
                  </td>
                  <td
                    data-testid={
                      `${userType}_${page}__element-order-table-quantity-${index}`
                    }
                  >
                    {item.quantity}
                  </td>
                  <td>

                    <p
                      data-testid={
                        `${userType}_${page}__element-order-table-unit-price-${index}`
                      }
                    >
                      {item.price.replace('.', ',')}
                    </p>
                  </td>
                  <td
                    data-testid={
                      `${userType}_${page}__element-order-table-sub-total-${index}`
                    }
                  >
                    {(item.quantity * item.price).toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                    })}
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
                </tr>
              );
            })}
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
                  ? totalPrice.replace('.', ',')
                  // totalPrice.toLocaleString('pt-BR', {
                // minimumFractionDigits: 2,
                  // })
                  : listProduct[0].totalPrice.replace('.', ',')}
              </span>
            </p>
          )}
        </div>
      </div>
    );
  }
  return (
    <p>Your cart is empty</p>
  );
}

OrderTable.propTypes = {
  page: PropTypes.string.isRequired,
};

export default OrderTable;
