import Item from './Item'

const ItemList = ({ products }) => {
  if (products.length === 0) {
    return <p className="empty-state">No hay productos en esta categoria.</p>
  }

  return (
    <section className="product-grid">
      {products.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </section>
  )
}

export default ItemList
