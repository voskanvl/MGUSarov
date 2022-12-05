export default function tabs() {
    const tabs = Array.from(document.querySelectorAll<HTMLElement>(".tab"));
    const tabsRoot = document.querySelector<HTMLElement>(".tabs");
    const machines = document.querySelector<HTMLElement>(".machines");
    const techcards = machines && Array.from(machines.children);

    const cardFilter = (type: string | null) => {
        techcards &&
            techcards.forEach(techcard => {
                const typeTechcard = techcard.getAttribute("type");
                (techcard as HTMLElement).style.display = type === typeTechcard ? "block" : "none";
            });
    };

    tabs.length &&
        tabs.forEach(e => {
            e.addEventListener("click", () => {
                //удаляем текущий current
                tabs.forEach(e => e.removeAttribute("current"));

                e.setAttribute("current", "current");
                const type = e.textContent;
                tabsRoot && tabsRoot.setAttribute("current", type || "");
                cardFilter(type);
                // techcards &&
                //     techcards.forEach(techcard => {
                //         const typeTechcard = techcard.getAttribute("type");
                //         (techcard as HTMLElement).style.display =
                //             type === typeTechcard ? "block" : "none";
                //     });
            });
        });

    tabsRoot && cardFilter(tabsRoot.getAttribute("current"));
}
