import type { SubmitFunction } from '@sveltejs/kit';

export type EnhanceData = {
	formElement: HTMLFormElement;
	submitFunction: SubmitFunction;
	submitEvent: SubmitEvent;
};

export function enhance(formElement: HTMLFormElement, submitFunction: SubmitFunction) {
	const listener = (e: Event) => {
		const event = new CustomEvent('storybook:enhance', {
			detail: {
				formElement,
				submitFunction,
				submitEvent: e
			}
		});
		window.dispatchEvent(event);
	};
	formElement.addEventListener('submit', listener);
	return {
		destroy() {
			formElement.removeEventListener('submit', listener);
		}
	};
}

export function applyAction() {}
export function deserialize() {}
