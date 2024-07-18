type Args = {
    cond: boolean;
    onResolve?: Promise<void>;
}

export async function scrollIf(node: Element, args: Args) {
    if (args.onResolve) {
        await args.onResolve;
    }

    if (args.cond) {
        // Wait for other node to render otherwise this will not work!
        // >= 50ms for mobile devices
        setTimeout(() => {
            node.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 100);
    }
}
