import React, { /* useContext, useEffect, */ useState } from 'react';
import PropTypes from 'prop-types';
// import AppContext from '../../context/Context';

function ProductCard({ product }) {
  const { id, name, price, url_image: urlImage } = product;

  const [quantity, setQuantity] = useState(0);
  // const { altQuantidade } = useContext(AppContext);

  // useEffect(
  //   () => altQuantidade({ ...product, quantity }),
  //   [altQuantidade, product, quantity],
  // );
  /*
executa a função altQuantidade sempre que altQuantidade,
product ou quantity mudarem. A função altQuantidade é executada com um objeto
contendo as propriedades de product e a nova quantidade selecionada,
para atualizar o carrinho de compras do requisito.
  */

  return (
    <div>
      <div>
        <p data-testid={ `customer_products__element-card-price-${id}` }>
          {price.replace('.', ',')}
        </p>
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt={ name }
          style={ { width: '100px' } }
        />
        <div>
          <div>
            <p data-testid={ `customer_products__element-card-title-${id}` }>
              {name}
            </p>
          </div>
        </div>
        <div>
          <button
            type="button"
            id="decrease"
            onClick={ (target) => {
              console.log('oi eu sou o target', target);
              if (quantity > 0) setQuantity(quantity - 1);
            } }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
          >
            remove
          </button>

          <input
            type="number"
            min="0"
            data-testid={ `customer_products__input-card-quantity-${id}` }
            value={ quantity }
            onChange={ ({ target }) => {
              setQuantity(Number(target.value));
            } }
          />
          <button
            type="button"
            onClick={ () => setQuantity(quantity + 1) }
            data-testid={ `customer_products__button-card-add-item-${id}` }
          >
            add
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    url_image: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
