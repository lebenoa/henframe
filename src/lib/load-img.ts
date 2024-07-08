// Currently unused.
// This used to replace spinners with images but somehow it didn't work.
// Neither with `img.complete` or `img.addEventListener("load", onLoad)`.
// It did load the image but didn't replace the spinner (`node`) for some reason.
// That's left use with `setTimeout` but it didn't solve the problem I was trying to solve.
// (Show loading state of an image since `<img>` by itself doesn't have width or height and I don't want to hardcode it)

import { settings } from "./stores/settings.svelte";

type ImgAttr = {
	src: string;
	class: string;
	[key: string]: string;
};

export function loadImg(node: HTMLDivElement, attr: ImgAttr) {
	const img = document.createElement("img");

	img.src = attr.src;
	img.setAttribute("onerror", "onImgError(this);");

	for (const [key, value] of Object.entries(attr)) {
		if (key === "src") continue;
		img.setAttribute(key, value);
	}

	img.setAttribute("style", `margin: ${settings.yMargin}rem ${settings.xMargin}rem;`);

	setTimeout(() => {
		node.replaceWith(img);
	}, 1000);
}
