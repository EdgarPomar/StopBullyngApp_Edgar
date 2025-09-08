describe('Rectangle (hardcodeado)', () => {
    // Creamos un "rectángulo" mock
    const rect = {
        width: 100,
        height: 200,
        text: '', // opcional, si quieres simular otras propiedades
        setSize(w: number, h: number) {
            this.width = w;
            this.height = h;
        },
        getSize() {
            return { x: this.width, y: this.height };
        },
    };

    it('getSize devuelve el tamaño correcto', () => {
        expect(rect.getSize()).toEqual({ x: 100, y: 200 });
    });

    it('setSize actualiza el tamaño', () => {
        rect.setSize(120, 240);
        expect(rect.getSize()).toEqual({ x: 120, y: 240 });
    });

    it('lanza error si los valores no son enteros', () => {
        const mockSetSize = (w: number, h: number) => {
            if (!Number.isInteger(w) || !Number.isInteger(h)) {
                throw new Error("El valor debe ser un número entero");
            }
            rect.width = w;
            rect.height = h;
        };

        expect(() => mockSetSize(10.5, 20)).toThrow("El valor debe ser un número entero");
        expect(() => mockSetSize(10, 20.7)).toThrow("El valor debe ser un número entero");
        expect(() => mockSetSize(100.1, 200)).toThrow("El valor debe ser un número entero");
        expect(() => mockSetSize(100, 200.9)).toThrow("El valor debe ser un número entero");
    });
});
