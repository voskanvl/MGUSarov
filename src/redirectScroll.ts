const OFFSET = 160;

export default function redirectScroll(
    blockElement: HTMLElement | null,
    scrollElement: HTMLElement | null,
) {
    if (!blockElement || !scrollElement) return;

    function stopRedirect() {
        document.documentElement.style.overflow = "";
    }
    function startRedirect() {
        document.documentElement.style.overflow = "hidden";
    }
    function isContainerInScreen(element: HTMLElement) {
        const { top } = element.getBoundingClientRect();
        return top <= 0 && top > -element.offsetHeight;
    }

    window.addEventListener("wheel", ({ deltaY }: WheelEvent) => {
        if (!isContainerInScreen(blockElement)) return;
        startRedirect();
        scrollElement.scrollTop += deltaY * 8;

        const ScrollOnBottom =
            scrollElement.scrollTop + scrollElement.offsetHeight === scrollElement.scrollHeight;
        const ScrollOnTop = scrollElement.scrollTop <= 0;

        if (deltaY > 0 && ScrollOnBottom) stopRedirect();
        if (deltaY < 0 && ScrollOnTop) stopRedirect();
    });
}
