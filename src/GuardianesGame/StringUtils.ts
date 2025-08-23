export class StringUtils {
    static isEmptyOrWhitespace(value?: string | null): boolean {
        return !value || value.trim().length === 0;
    }
}