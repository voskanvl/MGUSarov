import IMask from "imask";
// import { openModalAt } from "./modal";
export interface IForm extends HTMLFormElement {
    nameEl: HTMLInputElement;
    phone: HTMLInputElement;
    email: HTMLInputElement;
    comments?: HTMLInputElement;
}

export default function formInit(form: IForm | null) {
    // const form = document.querySelector<IForm>("#page-form");
    const errors = {
        nameEl: false,
        phone: false,
        email: {
            zero: false,
            less: false,
        },
    };
    if (form) {
        const phoneMask = IMask(form.phone, {
            mask: "+{7}(000)000-00-00",
            lazy: false,
        });

        form.phone.addEventListener("blur", () => {
            // phoneMask.typedValue.length !== 10 && console.log("blur", form.phone.validity);
            // console.log("blur", phoneMask.unmaskedValue.length - 1);
            const [_, errorLess] = form.phone.nextElementSibling
                ? Array.from(form.phone.nextElementSibling?.children)
                : [];
            if (phoneMask.unmaskedValue.length !== 11) {
                errorLess.setAttribute("active", "active");
                form.phone.classList.add("invalid");
                errors.phone = true;
            } else {
                errorLess.removeAttribute("active");
                form.phone.classList.remove("invalid");
                errors.phone = false;
            }
        });
        form.email.addEventListener("blur", () => {
            const [errorZero, errorLess] = form.email.nextElementSibling
                ? Array.from(form.email.nextElementSibling?.children)
                : [];
            if (form.email.value.trim().length === 0) {
                errorZero.setAttribute("active", "active");
                form.email.classList.add("invalid");
                errors.email.zero = true;
            } else {
                errorZero.removeAttribute("active");
                form.email.classList.remove("invalid");
                errors.email.zero = false;
            }
            if (/^[a-z0-9_\.-]+@[a-z0-9\-]+\.[a-z]{2,4}$/.test(form.email.value)) {
                errorLess.removeAttribute("active");
                form.email.classList.remove("invalid");
                errors.email.less = false;
            } else {
                errorLess.setAttribute("active", "active");
                form.email.classList.add("invalid");
                errors.email.less = true;
            }
        });
        form.nameEl.addEventListener("blur", () => {
            const [errorZero] = form.nameEl.nextElementSibling
                ? Array.from(form.nameEl.nextElementSibling?.children)
                : [];
            if (form.nameEl.value.trim().length === 0) {
                errorZero.setAttribute("active", "active");
                form.nameEl.classList.add("invalid");
                errors.nameEl = true;
            } else {
                errorZero.removeAttribute("active");
                form.nameEl.classList.remove("invalid");
                errors.nameEl = false;
            }
        });
        form.addEventListener("submit", e => {
            e.preventDefault();
            ["phone", "email", "nameEl"].forEach(e => {
                form[e].focus();
                form[e].blur();
            });
            const body = new FormData(form);
            const select = form.querySelector<HTMLSelectElement>("select[name='product']");
            const options: HTMLOptionElement[] | null = select ? Array.from(select?.options) : null;
            const selectedProduct = options && options?.filter(e => e.value === select?.value)[0];
            selectedProduct && body.append("product", selectedProduct?.innerHTML);

            if (errors.email.less || errors.email.zero || errors.nameEl || errors.phone) {
                console.log("errors", errors);
            } else {
                fetch("/mail.php", {
                    method: "POST",
                    body,
                }).then(r => {
                    if (r.ok) {
                        const previousInnerHTML = form.innerHTML;
                        form.innerHTML = `
                            <h2 style="text-align:center; font-size:25px;margin: 64px auto 16px; text-transform: uppercase; ">Ваша заявка успешно отправлена!</h2>
                                <svg width="113" height="176" viewBox="0 0 113 176" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <rect width="113" height="176" fill="url(#pattern0)"/>
                                <defs>
                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use xlink:href="#image0_86_905" transform="scale(0.00244509 0.00156986)"/>
                                </pattern>
                                <image id="image0_86_905" width="409" height="637" xlink:href="data:image/png;base64,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"/>
                                </defs>
                            </svg>

                        `;
                        setTimeout(() => {
                            form.innerHTML = previousInnerHTML;
                            formInit(form);
                        }, 2000);
                    }
                });
            }
        });
    }
}