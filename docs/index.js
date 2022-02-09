var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mustAsk = Boolean(location.hash === '#ask');
const templateHTTP = fetch('https://raw.githubusercontent.com/ruanmoreiraofc/' +
    location.pathname.split('/')[1] +
    '/main/main.html');
document.addEventListener('DOMContentLoaded', () => __awaiter(this, void 0, void 0, function* () {
    var _a;
    const response = yield templateHTTP;
    const responseAsText = yield response.text();
    const template = document.createElement('template');
    template.innerHTML = responseAsText;
    if (response.ok !== true)
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
        (_a = document.querySelector('#template-container')) === null || _a === void 0 ? void 0 : _a.appendChild(clone);
    }
}));
