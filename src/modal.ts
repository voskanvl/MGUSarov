export const openModalAt = (id: number, option?: number) => {
    const modal = document.querySelector(".modal") as HTMLDialogElement;
    modal.setAttribute("open", "open");
    modal.setAttribute("count", id + "");
    if (option) {
        const select = modal.querySelector<HTMLSelectElement>(
            `.modal__container:nth-child(${id}) select`,
        );
        // select && (select.selectedIndex = option);
        if (select)
            select.selectedIndex = Array.from(select.options).findIndex(
                (e: HTMLOptionElement) => Number(e.value) === option,
            );
    }
};
export function blockScroll() {
    document.body.style.height = "100vw";
    document.body.style.overflow = "hidden";
}
export function unblockScroll() {
    document.body.style.height = "";
    document.body.style.overflow = "";
}
export default function modal() {
    const burger = document.querySelector(".burger");
    const closeModal = document.querySelectorAll<HTMLButtonElement>(".modal__close");
    const modal = document.querySelector(".modal") as HTMLDialogElement;
    const menu = document.querySelector(".modal .menu") as HTMLDialogElement;
    const productButtons = document.querySelectorAll<HTMLAnchorElement>(
        ".presentation-module .price-form__button:not(.price-block__button_disabled)",
    );
    const techcardButtons = document.querySelectorAll<HTMLAnchorElement>(
        ".techcard__button.price-block__button:not(.price-block__button_black)",
    );
    console.log("🚀 ~ techcardButtons", techcardButtons);
    const priceBlocks = document.querySelectorAll<HTMLElement>(".price-block");

    burger &&
        burger.addEventListener("click", () =>
            setTimeout(() => {
                blockScroll();
                openModalAt(1);
            }, 600),
        );
    closeModal &&
        closeModal.forEach(closeEl =>
            closeEl.addEventListener("click", () => {
                if (!modal) return;
                unblockScroll();
                modal.removeAttribute("open");
            }),
        );
    menu &&
        menu.addEventListener("click", () => {
            if (!modal) return;
            document.body.style.height = "";
            document.body.style.overflow = "";
            modal.removeAttribute("open");
        });

    priceBlocks &&
        priceBlocks.length &&
        priceBlocks.forEach(priceBlock => {
            priceBlock.addEventListener("click", (e: Event) => {
                e.preventDefault();
                const option = priceBlock.dataset.id;
                console.log("🚀 ~ option", option);
                blockScroll();
                option && openModalAt(3, Number(option));
            });
        });

    productButtons &&
        productButtons.length &&
        productButtons.forEach(productButton => {
            productButton.addEventListener("click", (e: Event) => {
                e.preventDefault();
                const presentationModule =
                    productButton.closest<HTMLElement>(".presentation-module");
                const option = presentationModule ? presentationModule.dataset.id : null;
                blockScroll();
                option && openModalAt(2, Number(option));
            });
        });
    techcardButtons &&
        techcardButtons.length &&
        techcardButtons.forEach(techcardButton => {
            techcardButton.addEventListener("click", (e: Event) => {
                e.preventDefault();
                const techcard = techcardButton.closest<HTMLElement>(".techcard");
                const option = techcard ? techcard.dataset.id : null;
                blockScroll();
                option && openModalAt(2, Number(option));
            });
        });
}
