import { ApiResponse } from "../api/api.interfaces";

export interface OrderResponse extends ApiResponse {
  order: {
    id: string;
    total: number;
    status: "pending" | "completed" | "cancelled";
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: "client" | "admin";
      createdAt: string;
      updatedAt: string;
    };
    products: {
      productId: string;
    }[];
  };
}
