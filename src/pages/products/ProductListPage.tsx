import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useFetchData } from "../../hooks/useFecthData";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setProduct } from "../../store/product/productSlice";
import { ProductCard } from "../../components/product/ProductCard";
import { Product, ProductListResponse } from "../../interfaces/product/product.interfaces";
import empty from '../../assets/empty-order.png';
import { ProductsSelected } from "../../components/product/ProductsSelected";

export interface ProductWithQuantity extends Product {
  quantity: number;
}

export const ProductListPage = () => {
  const { fetchData, data } = useFetchData<ProductListResponse>();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.product);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductWithQuantity[]>([]);
  const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});

  useEffect(() => {
    fetchData("/products");
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(setProduct(data));
    }
  }, [data, dispatch]);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductIds((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const product = products.find(p => p.id === productId);
      const newQuantity = Math.min(Math.max(current + delta, 1), product?.stock ?? 1);
      return { ...prev, [productId]: newQuantity };
    });
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => {
      const quantity = quantities[product.id] ?? 1;
      const price = Number(product.price);
      if (isNaN(price)) return total;
      return total + quantity * price;
    }, 0);
  };

  useEffect(() => {
    const selected = products.filter(product => selectedProductIds.includes(product.id));
    setSelectedProducts(selected.map(product => ({ ...product, quantity: 1 })));
  }, [selectedProductIds, products]);

  return (
    <Box p={3}>
      {products.length > 0 ? (
        <>
          {selectedProducts.length > 0 && (
            <ProductsSelected
              selectedProducts={selectedProducts}
              quantities={quantities}
              onQuantityChange={handleQuantityChange}
              calculateTotal={calculateTotal}
            />
          )}

          <Grid container spacing={2} justifyContent="center">
            {products.map((product) => (
              <Grid item key={product.id}>
                <ProductCard
                  product={product}
                  isSelected={selectedProductIds.includes(product.id)}
                  onSelect={() => handleSelectProduct(product.id)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <img src={empty} alt="No hay productos" width={300} />
          <Typography variant="h6" mt={2} color="textSecondary">
            No hay productos disponibles
          </Typography>
        </Box>
      )}
    </Box>
  );
};
