// const OFFSET = (160 / 1920) * window.innerWidth;

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

    const handler = (deltaY: number, c: number = 8) => {
        const ScrollOnBottom =
            scrollElement.scrollTop + scrollElement.offsetHeight === scrollElement.scrollHeight;
        const ScrollOnTop = scrollElement.scrollTop <= 0;

        const { top } = blockElement.getBoundingClientRect();

        if (deltaY > 0 && !ScrollOnBottom && top < 0) {
            startRedirect();
            scrollElement.scrollTop += deltaY * c;
            return;
        }
        if (deltaY < 0 && 0 < top && !ScrollOnTop) {
            startRedirect();
            scrollElement.scrollTop += deltaY * c;
            return;
        }
        stopRedirect();
    };

    let down = 0;
    let delta = 0;
    window.addEventListener("touchstart", e => {
        down = e.changedTouches[0].screenY;
    });
    window.addEventListener("touchmove", e => {
        e.preventDefault();
        handler(-delta, 2);
    });
    window.addEventListener("touchend", e => {
        delta = e.changedTouches[0].screenY - down;
        console.log(delta);
    });

    window.addEventListener("wheel", ({ deltaY }: WheelEvent) => handler(deltaY));
}
