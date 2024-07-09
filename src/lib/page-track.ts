import { replaceState } from "$app/navigation";

function setQuery(param: string, value: string) {
	let url = new URL(window.location.href);
	url.searchParams.set(param, value);
    // @ts-ignore
	replaceState(url.href, {});
}

const observer = new IntersectionObserver((entries) => {
	if (entries[0].isIntersecting) {
		const pageNumber = entries[0].target.getAttribute("page-number");
		if (!pageNumber) return;

		setQuery("page", pageNumber);
	}
});

function scrollThis(node: HTMLImageElement) {
	setTimeout(() => {
		node.scrollIntoView({ behavior: "smooth", block: "start" });
	}, 100);
}

type TrackArgs = {
	pageNumber: number;
	queryNumber: number;
};

export function trackThisImage(node: HTMLImageElement, args: TrackArgs) {
	if (args.pageNumber == args.queryNumber) {
		scrollThis(node);

		node.addEventListener("load", () => {
			scrollThis(node);
		});
	}

	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}
