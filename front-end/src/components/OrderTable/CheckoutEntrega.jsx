function Entrega() {
  return (
    <div>
      <h1> Detalhes e Endereço de Entrega</h1>
      <label htmlFor="People">
        P. Vendedora Responsável
        <br />
        <select
          id="People"
          data-testid="customer_checkout__select-seller"
        >
          <option>
            Fulana Pereira
          </option>
        </select>
      </label>
      <br />
      <label htmlFor="address">
        Endereço
        <br />
        <input
          id="address"
          name="address"
          data-testid="customer_checkout__input-address"
          type="text"
        //   onChange={ teste }
        />
      </label>
      <br />
      <label htmlFor="numberCheckout">
        Número
        <br />
        <input
          id="numberCheckout"
          name="numberCheckout"
          data-testid="customer_checkout__input-address-number"
          type="text"
        //   onChange={ }
        />
      </label>
      <br />
      <button
        data-testid="customer_checkout__button-submit-order"
        type="submit"
        // onClick={  }
      >
        FINALIZAR PEDIDO
      </button>
    </div>
  );
}
export default Entrega;
