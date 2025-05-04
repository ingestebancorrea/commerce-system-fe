import { Box, Typography, IconButton, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { ProductWithQuantity } from "../../pages/products/ProductListPage";
import { useAxiosPost } from "../../hooks/usePostAxios";
import { OrderResponse } from "../../interfaces/order/order.interfaces";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Loader } from "../app/Loader";
import { useEffect } from "react";

interface ProductsSelectedProps {
    selectedProducts: ProductWithQuantity[];
    quantities: { [productId: string]: number };
    onQuantityChange: (productId: string, delta: number) => void;
    calculateTotal: () => number;
}

export const ProductsSelected = ({
    selectedProducts,
    quantities,
    onQuantityChange,
    calculateTotal,
}: ProductsSelectedProps) => {
    const url = `${import.meta.env.VITE_API_URL}/orders`;
    const { handleSubmit } = useForm();
    const { id } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const formatCurrency = (value: number) =>
        value.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }
        );
    const { postData, isLoading, data: response } = useAxiosPost<OrderResponse>();

    const onSubmit = async () => {
        if (!id) return;
      
        const orderPayload = {
          userId: id,
          products: selectedProducts.map((product) => ({
            productId: product.id,
            quantity: quantities[product.id] || 1,
          })),
        };
      
        await postData(url, orderPayload);
    };

    useEffect(() => {
        if (response) {
            //   const {
            //     token,
            //     user: { id, email, name }
            //   } = response;
            //   dispatch(setOrder({ id, email, name, token }));
        }
    }, [dispatch, response]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={3} p={2} border={1} borderRadius={2} borderColor="grey.300">
                <Typography variant="h6" mb={2}>Productos seleccionados:</Typography>

                {selectedProducts.map((product) => (
                    <Box key={product.id} display="flex" alignItems="center" my={2}>
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            width={50}
                            height={50}
                            style={{ marginRight: 10 }}
                        />
                        <Typography variant="body1" sx={{ flexGrow: 1 }}>
                            {product.name} - Productos disponibles: {product.stock}
                        </Typography>

                        <Box display="flex" alignItems="center" gap={1}>
                            <IconButton
                                onClick={() => onQuantityChange(product.id, -1)}
                                disabled={(quantities[product.id] || 1) <= 1}
                            >
                                <Remove />
                            </IconButton>
                            <Typography variant="body1" width={24} textAlign="center">
                                {quantities[product.id] || 1}
                            </Typography>
                            <IconButton
                                onClick={() => onQuantityChange(product.id, 1)}
                                disabled={(quantities[product.id] || 1) >= product.stock}
                            >
                                <Add />
                            </IconButton>
                        </Box>
                    </Box>
                ))}

                <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Total: {formatCurrency(calculateTotal())}</Typography>
                    <Button type="submit" variant="contained" color="primary">
                        Confirmar Orden
                    </Button>
                </Box>
            </Box>
        </form>
    );
};
