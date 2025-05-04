import { useSnackbar } from "notistack";

type TUseAlerts = {
    message: string,
    options?: {
        variant?: 'default' | 'error' | 'success' | 'warning' | 'info',
        anchorOrigin?: {
            horizontal: "left" | "center" | "right";
            vertical: "top" | "bottom";
        }
    }
}

export const useAlerts = () => {
    const { enqueueSnackbar } = useSnackbar();

    const handleClickAlert = ({ message, options }: TUseAlerts) => {
        enqueueSnackbar(message, {
            variant: options?.variant || "default",
            anchorOrigin: options?.anchorOrigin || {
                vertical: "top",
                horizontal: "right",
            },
        });
    };

    return {
        handleClickAlert,
    };
};
