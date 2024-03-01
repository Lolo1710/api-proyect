import { ProductList } from "@/components/ProductList";
import { IProduct } from "@/interfaces";
import { useState } from "react";
import axios from "axios";
import styles from "@/styles/Home.module.scss";
import { CheckoutForm } from "@/components/CheckoutForm";
import NavBar from "@/components/nav";

export default function Home({ products }: { products: IProduct[] }) {
  const [productSelected, setProductSelected] = useState<IProduct | null>(null);
  const onSelectProduct = (product: IProduct) => {
    return product === productSelected
      ? setProductSelected(null)
      : setProductSelected(product);
  };
  return (
    <div className="container">
      <main className={styles.container}>
        <NavBar name={"Ventas"} url={"dashboard"}></NavBar>
        <h1>Selecciona un producto</h1>
        <ProductList
          onSelect={onSelectProduct}
          productSelected={productSelected}
          products={products}
        />
        {productSelected && <CheckoutForm productSelected={productSelected} />}
      </main>
    </div>
    
  );
}

export async function getStaticProps() {
  try {
    const { data } = await axios.get("http://localhost:3000/api/products");
    const products = data;

    return {
      props: { products },
      revalidate: 86400,
    };
  } catch (error) {
    console.log(error);
    return {
      props: { products: [] },
    };
  }
}
