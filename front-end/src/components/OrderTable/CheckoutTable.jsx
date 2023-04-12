import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
// import { useLocation } from 'react-router';
import useLocalStorage from '../../Utils/useLocalStorage';
import AppContext from '../../context/Context';

function OrderTable({ page, saleProducts }) {
  const {
    getCart,
    getOrder,
    totalValues,
    altQuantidade,
    listProduct,
    setlistProduct,
  } = useContext(AppContext);
  const user = useLocalStorage('user')[0];
  const { role: userType } = user;
  const [totalPriceState, setTotalPrice] = useState('');
  const setCartStorage = useLocalStorage('cart')[1];

  useEffect(() => {
    if (Object.keys(saleProducts).length !== 0) { // Req 25 e 30, tela de detalhes de pedidos (cliente e vendedor)
      const { products, totalPrice } = saleProducts;
      setlistProduct(products);
      setTotalPrice(totalPrice.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
      }).toString().replace('.', ','));
    }

    if (Object.keys(saleProducts).length === 0) {
      const cart = getCart();
      setTotalPrice(totalValues());
      setlistProduct(cart);
      setCartStorage(listProduct);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(saleProducts).length === 0) {
      const cart = getCart();
      // const order = getOrder();
      setTotalPrice(totalValues().toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
      }).toString().replace('.', ','));
      setlistProduct(cart);
      setCartStorage(listProduct);
    }
  }, [getCart, getOrder, totalValues, page, listProduct, setCartStorage]);

  const removeIndex = (product) => {
    altQuantidade({ ...product, quantity: 0 });
  };

  if (listProduct !== undefined && listProduct.length > 0) {
    return (
      <div>
        <table className="maincard">
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
                    {
                      item.SalesProduct !== undefined
                        ? item.SalesProduct.quantity
                        : item.quantity
                    }
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
                    { item.SalesProduct !== undefined
                      ? (item.SalesProduct.quantity * item.price)
                        .toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                        .toString().replace('.', ',')
                      : (item.quantity * item.price).toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                      }).toString().replace('.', ',')}
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
                {
                  totalPriceState
                }
              </span>
            </p>
          )}
        </div>
      </div>
    );
  }
  return (
    <>
      <p>Your cart is empty</p>
      <h1>Loading</h1>
    </>
  );
}

OrderTable.propTypes = {
  page: PropTypes.string.isRequired,
  saleProducts: PropTypes.shape({
    products: PropTypes.arrayOf(),
    totalPrice: PropTypes.string,
  }),
};

OrderTable.defaultProps = {
  saleProducts: {},
};

export default OrderTable;
