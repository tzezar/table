import type { SortingElement } from "../index.js";

export function getPropertyValue(obj: any, path: string): any {
    if (!obj || !path) return ''; // Add this check

    const properties = path.split('.');
    return properties.reduce((prev, curr) => prev && prev[curr], obj) || '';
}

export function sortByPropertyName(array: any[], propertyName: string, sortingElement: SortingElement): any[] {
    if (propertyName === '' || sortingElement.direction === '') {
        return array;
    }

    return array.slice().sort((a, b) => {
        const valueA = getPropertyValue(a, propertyName);
        const valueB = getPropertyValue(b, propertyName);

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            // Compare numbers directly
            return sortingElement.direction === 'ASC' ? valueA - valueB : valueB - valueA;
        }

        // If not numbers, treat them as strings
        const stringA = String(valueA).toUpperCase();
        const stringB = String(valueB).toUpperCase();

        return sortingElement.direction === 'ASC'
            ? stringA.localeCompare(stringB)
            : stringB.localeCompare(stringA);
    });
}