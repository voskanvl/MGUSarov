export default function scroll() {
    const scrollElements = document.querySelectorAll<HTMLElement>(".scroll");
    if (!scrollElements.length) return;
    scrollElements.forEach(scrollContainer => {
        let isDown = false;
        scrollContainer.addEventListener("mousedown", () => {
            isDown = true;
        });
        scrollContainer.addEventListener("mouseup", () => {
            isDown = false;
        });
        scrollContainer.addEventListener("mousemove", event => {
            const { movementY } = event;
            event.preventDefault();
            if (isDown) {
                console.log("move");
                scrollContainer.scrollTop -= movementY;
            }
        });
        scrollContainer.addEventListener("mouseout", () => {
            isDown = false;
        });
    });
}
