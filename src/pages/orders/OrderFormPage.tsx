import { useLocation } from "react-router-dom";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useAxiosPost } from "../../hooks/usePostAxios";
import { Loader } from "../../components/app/Loader";
import { AppLayout } from "../../layout/app/AppLayout";

export const OrderFormPage = () => {
  const url = `${import.meta.env.VITE_API_URL}/orders`;
  const location = useLocation();
  const selectedProductIds = location.state?.selectedProductIds || [];
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { postData, isLoading } = useAxiosPost();

  const onSubmit = async (data: FieldValues) => {
    const orderData = { productIds: selectedProductIds, ...data };
    await postData(url, orderData);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AppLayout>
      <div>
        <Typography variant="h4" align="center">Formulario de Pedido</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column" alignItems="center" justifyContent="center">
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{ required: 'La dirección es requerida' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Dirección de entrega"
                    type="text"
                    fullWidth
                    sx={{ width: '280px' }}
                    error={!!errors.address}
                    helperText={typeof errors.address?.message === 'string' ? errors.address?.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{ required: 'El número de teléfono es requerido' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Número de teléfono"
                    type="text"
                    fullWidth
                    sx={{ width: '280px' }}
                    error={!!errors.phone}
                    helperText={typeof errors.phone?.message === 'string' ? errors.phone?.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ bgcolor: '#FD5149', width: '280px' }}
              >
                Enviar Pedido
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </AppLayout>
  );
};
