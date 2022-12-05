// import debounce from "./debounce";
const reinitialItems = (el: string) => {
    const items = document.querySelectorAll<HTMLElement>(el);
    items.forEach((e, i) => e.setAttribute("data-number", i + ""));
};
const reinitialCurrent = (arr: HTMLElement[]) => {
    arr.forEach(e => e.removeAttribute("current"));
    arr[2] && arr[2].setAttribute("current", "current");
};
export default function roller() {
    const root = document.querySelector(".roller") as HTMLElement;
    const el = document.querySelector(".roller__container") as HTMLElement;
    const pm = Array.from(document.querySelectorAll<HTMLElement>(".presentation-module"));

    reinitialItems(".roller__item[data-number]");
    reinitialItems(".presentation-module");
    pm && reinitialCurrent(pm);

    const emmitEvent = () => {
        const currentEl = el.querySelector(".roller__item[data-number='2']") as HTMLElement;
        const id = currentEl && currentEl.dataset?.id;
        console.log("🚀 ~ id", id);
        root.setAttribute("current", id ?? "");
        root.dispatchEvent(
            new CustomEvent("current", {
                detail: id,
            }),
        );
    };

    const changeCurrent = (
        sign: 1 | -1,
        cb: (elem: Element, i: number, items: Element[]) => void,
    ): void => {
        const items = Array.from(el.children);
        items.forEach((elem, i) => {
            (elem as HTMLElement).dataset.number =
                Number((elem as HTMLElement).dataset.number) - sign + "";

            cb(elem, i, items);
        });
        emmitEvent();
    };
    const increaseCurrent = () => {
        changeCurrent(-1, (elem, i, items) => {
            if (i === items.length - 1) {
                (elem as HTMLElement).dataset.number = "0";
                el.prepend(elem);
            }
        });
    };
    const decreaseCurrent = () => {
        changeCurrent(1, (elem, i, items) => {
            if (i === 0) {
                (elem as HTMLElement).dataset.number = items.length - 1 + "";
                el.append(elem);
            }
        });
    };

    const handler = <T extends WheelEvent>(e: T) => {
        const isWheelEvent = "deltaY" in e;
        e.preventDefault();
        e.stopPropagation();
        // e.stopImmediatePropagation();

        if (isWheelEvent && e.deltaY > 0) increaseCurrent();

        if (isWheelEvent && e.deltaY < 0) decreaseCurrent();
    };

    // el && el.addEventListener("pointermove", debounce(handler, 100));

    el && el.addEventListener("wheel", handler);

    let positionYOnTouch = 0;

    root &&
        root.addEventListener("touchstart", (e: TouchEvent) => {
            document.body.style.overflow = "hidden";
            const { clientY } = e.changedTouches[0];
            positionYOnTouch = clientY;
        });
    root &&
        root.addEventListener("touchend", (e: TouchEvent) => {
            const { clientY } = e.changedTouches[0];
            const delta = clientY - positionYOnTouch;
            if (delta > 0) {
                increaseCurrent();
            } else {
                decreaseCurrent();
            }
            document.body.style.overflow = "";
        });
    /* ИНИЦИАЛИЗАЦИЯ ПЕРЕКЛЮЧЕНИЯ ПРЕЗЕНТАЦИЙ */

    root &&
        root.addEventListener("current", (event: Event) => {
            pm.forEach(e => {
                const {
                    dataset: { id: elId },
                } = e;
                e.removeAttribute("current");
                if (elId === (event as CustomEvent).detail) {
                    e.setAttribute("current", "current");
                }
            });
        });
}
