# ProyectoFinalWallace

Proyecto final de React JS. La idea fue hacer un e-commerce de cafe de especialidad llamado **Origen Cafe**.

## Tecnologias usadas

- React
- Vite
- React Router DOM
- Context API
- Firebase Firestore
- CSS

## Que incluye

- Catalogo de productos.
- Filtro por categorias.
- Detalle individual de cada producto.
- Contador para elegir cantidad, con limite por stock.
- Carrito manejado con Context.
- Icono del carrito con la cantidad total de unidades.
- Vista del carrito con productos, subtotales y total.
- Formulario de checkout.
- Generacion de una orden de compra.
- Mensajes condicionales para carga, carrito vacio y productos sin stock.

## Instalacion

```bash
npm install
npm run dev
```

## Firebase

El proyecto usa Firestore para traer los productos y guardar las ordenes.

Proyecto usado para las pruebas: `proyecto-final-wallace-2026`.

Para configurarlo hay que crear un archivo `.env` en la raiz del proyecto con estos datos:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

La coleccion de productos se llama `products` y la coleccion donde se guardan las compras se llama `orders`.
Las reglas usadas estan en `firestore.rules`.

Ejemplo de producto:

```js
{
  name: 'Ethiopia Yirgacheffe',
  category: 'granos',
  description: 'Cafe floral de acidez brillante, notas a jazmin, durazno y miel.',
  price: 12600,
  stock: 12,
  image: 'https://...'
}
```

Si las variables de Firebase no estan cargadas, la app usa datos locales para poder probar la navegacion y el carrito.

## Rutas

- `/` muestra todo el catalogo.
- `/category/:categoryId` filtra productos por categoria.
- `/item/:itemId` muestra el detalle.
- `/cart` muestra el carrito.
- `/checkout` muestra el formulario para terminar la compra.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```
