const mustAsk = Boolean(location.hash === '#ask');
document.addEventListener('DOMContentLoaded', () => {
    var _a, _b;
    const template = (_a = document.querySelector('template')) !== null && _a !== void 0 ? _a : null;
    if (template === null)
        return;
    if ('content' in template === false) {
        alert('Your browser do not support html templates!');
        return;
    }
    const quantityDefault = 4;
    const quantity = Math.min(100, Math.max(0, mustAsk
        ? Number(prompt('Please enter a quantity of elements do you want to display:', String(quantityDefault))) || quantityDefault
        : quantityDefault));
    for (let i = 0; i <= quantity; i++) {
        const percent = String(i === 0 //
            ? 0
            : Math.floor(100 / quantity) * i);
        // prettier-ignore
        const clone = (document
            .importNode(template.content, true)
            .firstElementChild);
        clone.querySelector('text').textContent = percent;
        clone.style.setProperty('--current-volume-percent', percent);
        (_b = document.querySelector('#template-container')) === null || _b === void 0 ? void 0 : _b.appendChild(clone);
    }
});
