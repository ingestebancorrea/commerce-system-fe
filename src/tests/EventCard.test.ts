import { formatDate } from '../helpers/formatDate';

describe('Funciones dentro del componente de event card',() => {

    describe('formatDate', () => {
        test('Debe retornar un string', () => {
            const result = formatDate('2024-04-03T05:00:00.000Z');
            expect(typeof result).toBe('string');
        });

        test('Debe retornar el string formateado', () => {
            expect(formatDate('2024-04-03T05:00:00.000Z')).toBe('3 de abril de 2024');
        });
    });

});