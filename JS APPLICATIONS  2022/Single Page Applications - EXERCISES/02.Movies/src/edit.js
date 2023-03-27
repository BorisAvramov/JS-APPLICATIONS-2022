

// initialization
// - find relevant section
// - detach section from DOM

import { showViewSection } from "./dom.js";

const editSection = document.getElementById('edit-movie');
editSection.remove();

// display logic

export function showEditSection () {

    showViewSection(editSection);

}