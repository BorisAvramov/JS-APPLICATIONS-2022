


// initialization
// - find relevant section
// - detach section from DOM

import { showViewSection } from "./dom.js";

const createSection = document.getElementById('add-movie');
createSection.remove();

// display logic

export function showCreateSection () {

    showViewSection(createSection);

}