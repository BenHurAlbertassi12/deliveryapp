import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/Context';

function ProductCard({ product }) {
  const { id, name, price, url_image: urlImage } = product;
  const [quantity, setQuantity] = useState(0);
  const { altQuantidade } = useContext(AppContext);

  useEffect(() => {
    altQuantidade({ ...product, quantity });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, quantity]);
  /*
executa a função altQuantidade sempre que altQuantidade,
product ou quantity mudarem. A função altQuantidade é executada com um objeto
contendo as propriedades de product e a nova quantidade selecionada,
para atualizar o carrinho de compras do requisito.
  */

  const handleChange = (event) => {
    if (Number(event.target.value) >= 0) {
      setQuantity(Number(event.target.value));
    }
  };

  return (
    <div className="card">
      <div>
        <div className="bold">
          <p data-testid={ `customer_products__element-card-price-${id}` }>
            R$
            {' '}
            {price.replace('.', ',')}
          </p>
        </div>
      </div>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <div>
        <p data-testid={ `customer_products__element-card-title-${id}` }>
          {name}
        </p>
      </div>
      <div className="value">
        <button
          type="button"
          id="decrease"
          onClick={ () => {
            if (quantity > 0) setQuantity(quantity - 1);
          } }
          data-testid={ `customer_products__button-card-rm-item-${id}` }
        >
          -
        </button>

        <input
          type="number"
          min={ 0 }
          data-testid={ `customer_products__input-card-quantity-${id}` }
          onChange={ handleChange }
          value={ Number(quantity) }
        />
        <button
          type="button"
          onClick={ () => setQuantity(quantity + 1) }
          data-testid={ `customer_products__button-card-add-item-${id}` }
        >
          +
        </button>
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
