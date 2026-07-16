import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { products } from '../data/products'
import { db } from '../firebase/config'

const formatDocument = (document) => ({
  id: document.id,
  ...document.data(),
})

export const getProducts = async (categoryId) => {
  if (!db) {
    return categoryId ? products.filter((product) => product.category === categoryId) : products
  }

  const productsRef = collection(db, 'products')
  const productsQuery = categoryId
    ? query(productsRef, where('category', '==', categoryId), orderBy('name'))
    : query(productsRef, orderBy('name'))

  const snapshot = await getDocs(productsQuery)
  return snapshot.docs.map(formatDocument)
}

export const getProductById = async (itemId) => {
  if (!db) {
    return products.find((product) => product.id === itemId) ?? null
  }

  const productRef = doc(db, 'products', itemId)
  const snapshot = await getDoc(productRef)
  return snapshot.exists() ? formatDocument(snapshot) : null
}

export const createOrder = async (order) => {
  if (!db) {
    return `local-${Date.now()}`
  }

  const ordersRef = collection(db, 'orders')
  const orderWithDate = {
    ...order,
    createdAt: serverTimestamp(),
  }
  const response = await addDoc(ordersRef, orderWithDate)
  return response.id
}
