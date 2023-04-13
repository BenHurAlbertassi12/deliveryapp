import React from 'react';

export default function thTable({ page }) {
  return (
    <tr>
      <th>Item</th>
      <th>Descrição</th>
      <th>Quantidade</th>
      <th>Valor Unitário</th>
      <th>Sub-total</th>
      {page === 'checkout' && <th>Remover Item</th>}
    </tr>
  );
}
