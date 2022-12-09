import "./sass/style.sass";
import "@splidejs/splide/css";

import roller from "./roller";
// import scroll from "./scroll";
import scrollIO from "./scrollIO";

/* SLIDES */
roller();
/* SCROLL */
// scroll();
scrollIO(document.querySelector<HTMLElement>(".interviews__right"));
