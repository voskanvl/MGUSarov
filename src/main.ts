import "./sass/style.sass";
import "@splidejs/splide/css";

import modal from "./modal";
import slides from "./slides";
import roller from "./roller";
import tabs from "./tabs";
import formInit, { IForm } from "./form";

/* MODAL */
modal();
/* SLIDES */
slides();
/* ROLLER */
roller();
/* TABS */
tabs();
/* form */
formInit(document.querySelector<IForm>("#page-form"));
formInit(document.querySelector<IForm>("#modal-park-form"));
formInit(document.querySelector<IForm>("#modal-service-form"));
