import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "../../pages/app/HomePage"
import { OrderFormPage } from "../../pages/orders/OrderFormPage"

export const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={ <HomePage/> } />
      <Route path="/order-form" element={<OrderFormPage />} />
      <Route path="/*" element={ <Navigate to="/"/> } />
    </Routes>
  )
}