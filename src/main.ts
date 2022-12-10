import './sass/style.sass';
import '@splidejs/splide/css';

// import roller from './roller';
// import scroll from "./scroll";
import scrollIO from './scrollIO';

/* SLIDES */
// roller();
/* SCROLL */
// scroll();
scrollIO(document.querySelector<HTMLElement>('.interviews__right'));
scrollIO(document.querySelector<HTMLElement>('.interviews1__right'));
scrollIO(document.querySelector<HTMLElement>('.interviews2__right'));
scrollIO(document.querySelector<HTMLElement>('.approach__left'));
