import { replaceState } from "$app/navigation";
import { page } from "$app/stores";
import { get } from "svelte/store";

function setQuery(param: string, value: string) {
    let url = new URL(window.location.href);
    url.searchParams.set(param, value);
    // @ts-ignore
    replaceState(url.href, get(page).state);
}

function handleOnReload(e: Event) {
    const target = e.target as HTMLImageElement;
    const pageNumber = target.getAttribute("page-number");
    if (!pageNumber) return;

    setQuery("page", pageNumber);
    target.removeEventListener("load", handleOnReload);
}

const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
        const target = entry.target as HTMLImageElement;

        const isLoadError = target.getAttribute("data-load-error");
        if (isLoadError) {
            target.src = target.src + "?t" + Date.now();
            target.removeAttribute("data-load-error");
            target.addEventListener("load", handleOnReload);
            return;
        }

        const pageNumber = target.getAttribute("page-number");
        if (!pageNumber) return;

        setQuery("page", pageNumber);
    }
});

function scrollThis(node: HTMLImageElement) {
    setTimeout(() => {
        node.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
}

function handleLoadEvent(e: Event) {
    const target = e.target as HTMLImageElement;

    scrollThis(target);

    target.removeEventListener("load", handleLoadEvent);
}

type TrackArgs = {
    pageNumber: number;
    queryNumber: number;
};

export function trackThisImage(node: HTMLImageElement, args: TrackArgs) {
    if (args.pageNumber == args.queryNumber) {
        if (node.complete) {
            scrollThis(node);
        } else {
            node.addEventListener("load", handleLoadEvent);
        }
    }

    observer.observe(node);

    return {
        destroy() {
            observer.unobserve(node);
        }
    };
}
