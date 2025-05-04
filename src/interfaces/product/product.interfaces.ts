export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    stock: number;
    category: string;
    imageUrl: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProductState {
    products: Product[];
    product: Product;
}

export interface ProductListResponse extends Array<Product> {}