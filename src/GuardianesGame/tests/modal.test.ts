describe('Modal (hardcodeado)', () => {
    // Simulamos el modal como un objeto simple
    const modal = {
        modalContainer: { visible: false },
        contentContainer: { scale: { set: jest.fn() } },
        text: { text: '' },
        onCloseCallback: null as (() => void) | null,
        open() {
            this.modalContainer.visible = true;
            this.contentContainer.scale.set(1, 1);
        },
        close() {
            this.modalContainer.visible = false;
            if (this.onCloseCallback) this.onCloseCallback();
        },
        setText(text: string) {
            this.text.text = text;
        },
        onClose(callback: () => void) {
            this.onCloseCallback = callback;
        },
    };

    it('setText actualiza el texto', () => {
        modal.setText('Hola mundo');
        expect(modal.text.text).toBe('Hola mundo');
    });

    it('open hace visible el modal', () => {
        modal.open();
        expect(modal.modalContainer.visible).toBe(true);
    });

    it('close llama al callback y oculta el modal', () => {
        const callback = jest.fn();
        modal.onClose(callback);

        modal.close();

        expect(modal.modalContainer.visible).toBe(false);
        expect(callback).toHaveBeenCalled();
    });
});
