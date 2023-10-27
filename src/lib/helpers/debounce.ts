export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
	func: T,
	wait: number
): T {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	let lastReject: (reason?: any) => void;
	let lastPromise: Promise<any> | null = null;

	return ((...args: Parameters<T>): Promise<ReturnType<T>> => {
		if (lastPromise) {
			lastReject({ reason: 'Cancelled due to new promise' });
		}

		return (lastPromise = new Promise<ReturnType<T>>((resolve, reject) => {
			if (timeoutId !== null) {
				clearTimeout(timeoutId);
			}

			timeoutId = setTimeout(async () => {
				timeoutId = null;
				try {
					const result = await func(...args);
					resolve(result);
				} catch (e) {
					reject(e);
				}
			}, wait);

			lastReject = reject;
		}));
	}) as T;
}
