export function formatDate(inputDate: string) {
    return new Date(inputDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}
