

// initialization
// - find relevant section
// - detach section from DOM

import { showViewSection } from "./dom.js";

const registerSection = document.getElementById('form-sign-up');
registerSection.remove();

// display logic

export function showRegisterSection () {

    showViewSection(registerSection);

}