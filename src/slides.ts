import { MSplides } from "./initSlides";
export default function slides() {
    const ranges = [0, 425, 768, 1024, 1440, Infinity];
    const rangesTabs = [0, 468, 1323, Infinity];
    // const rangesProduct = [0, 468, 1323, Infinity];

    function matchRange(x: number, arr: number[]) {
        let res;
        arr = arr.sort((a, b) => a - b);
        for (let index = 0; index < arr.length - 1; index++) {
            const up = x >= arr[index];
            const down = x < arr[index + 1];
            if (up && down) res = index;
        }
        return res;
    }

    const splidesInstance = new MSplides();
    const servicePackage = document.querySelector("#service-package");
    const tabs = document.querySelector("#tabs");
    const product = document.querySelector("#product");

    servicePackage &&
        splidesInstance.add("#service-package", {
            type: "loop",
            arrows: false,
            pagination: false,
            // perPage: matchRange(innerWidth, ranges),
            perPage: 4,
            perMove: 1,
            // autoWidth: true,
        });
    tabs &&
        splidesInstance.add("#tabs", {
            type: "loop",
            arrows: false,
            pagination: false,
            perPage: 4,
            perMove: 1,
            // padding: { left: 10, right: 20 },
            // fixedWidth: "25%",
            focus: "center",
        });
    product &&
        splidesInstance.add("#product", {
            type: "loop",
            arrows: false,
            pagination: false,
            // perPage: 2,
            // perMove: 1,
            focus: "center",
            autoWidth: true,
        });
    /* RESIZE */
    function debounce(f: Function, ms: number) {
        let isCooldown = false;
        return function () {
            if (isCooldown) return;
            f(arguments);
            isCooldown = true;
            setTimeout(() => (isCooldown = false), ms);
        };
    }

    window.addEventListener(
        "resize",
        debounce(() => {
            const perPage = matchRange(innerWidth, ranges);

            splidesInstance.instances["#service-package"] &&
                (splidesInstance.instances["#service-package"].options.perPage = perPage);
            splidesInstance.instances["#service-package"] &&
                splidesInstance.instances["#service-package"].refresh();
        }, 200),
    );

    window.addEventListener(
        "resize",
        debounce(() => {
            const perPage = 2 + (matchRange(innerWidth, rangesTabs) || 0);
            console.log("🚀 ~ perPage", perPage);

            splidesInstance.instances["#tabs"] &&
                (splidesInstance.instances["#tabs"].options.perPage = perPage);
            splidesInstance.instances["#tabs"] && splidesInstance.instances["#tabs"].refresh();
        }, 200),
    );

    let perPage = matchRange(innerWidth, ranges);
    splidesInstance.instances["#service-package"] &&
        (splidesInstance.instances["#service-package"].options.perPage = perPage || 0 + 1);
    splidesInstance.instances["#service-package"] &&
        splidesInstance.instances["#service-package"].refresh();

    perPage = 2 + (matchRange(innerWidth, rangesTabs) || 0);
    console.log("🚀 ~ perPage", matchRange(innerWidth, rangesTabs), perPage);
    splidesInstance.instances["#tabs"] &&
        (splidesInstance.instances["#tabs"].options.perPage = perPage);
    splidesInstance.instances["#tabs"] && splidesInstance.instances["#tabs"].refresh();
}
