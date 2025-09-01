import React from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Product(props) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <section>
        <h2 className="mb-4 text-lg font-medium">Products</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              img={product.img}
              tags={product.tags}
              inStock={product.inStock}
              onAdd={() =>
                props.onAdd({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  img: product.img,
                })
              }
              onOpenModel={() => 
                props.onOpenModel(product)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
