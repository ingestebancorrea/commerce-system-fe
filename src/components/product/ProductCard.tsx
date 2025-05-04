import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Product } from "../../interfaces/product/product.interfaces";

interface Props {
  product: Product;
  isSelected?: boolean;
  onSelect?: (product: Product) => void;
}

export const ProductCard = ({ product, isSelected = false, onSelect }: Props) => {
  const handleClick = () => {
    if (onSelect) onSelect(product);
  };

  return (
    <Card
      sx={{
        width: 300,
        m: 2,
        boxShadow: 3,
        border: isSelected ? '2px solid #1976d2' : '1px solid #ccc',
        cursor: 'pointer',
        transition: 'border 0.1s',
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="180"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Box mt={2}>
          <Typography variant="subtitle2"><strong>Precio:</strong> ${parseFloat(product.price).toLocaleString()}</Typography>
          <Typography variant="subtitle2"><strong>Stock:</strong> {product.stock}</Typography>
          <Typography variant="subtitle2"><strong>Categoría:</strong> {product.category}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
