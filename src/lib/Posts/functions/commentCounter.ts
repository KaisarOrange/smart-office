/* eslint-disable @typescript-eslint/no-explicit-any */
export function countElements(arr: any) {
	let count = 0;

	function traverseArray(subArray: any) {
		subArray.forEach((element: any) => {
			if (Array.isArray(element)) {
				// If the element is an array, recursively traverse it
				traverseArray(element);
			} else {
				// If the element is not an array, increment the count
				count++;
			}
		});
	}

	traverseArray(arr);
	return count;
}
