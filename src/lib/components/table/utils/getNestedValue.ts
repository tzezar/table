export function getNestedValue(obj, path) {
	const properties = path.split('.');
	return properties.reduce((accumulator, currentProperty) => {
		if (accumulator && accumulator[currentProperty]) {
			return accumulator[currentProperty];
		}
		return undefined;
	}, obj);
}
