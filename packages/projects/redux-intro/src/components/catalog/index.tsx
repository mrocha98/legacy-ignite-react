import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import type { Product } from '../../store/modules/cart/types'
import { CatalogItem } from '../catalog-item'

export function Catalog() {
  const [catalog, setCatalog] = useState<Product[]>([])

  useEffect(() => {
    api.get('products').then((res) => setCatalog(res.data))
  }, [])

  return (
    <main>
      <h1>Catálogo</h1>
      {catalog.map((product) => (
        <CatalogItem key={product.id} product={product} />
      ))}
    </main>
  )
}
