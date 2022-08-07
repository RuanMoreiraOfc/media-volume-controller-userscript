var DOM_SELECTORS = Object.freeze({
    get container() {
        return '#media-volume-controller-userscript';
    },
    get content() {
        return ".content";
    },
    get volume() {
        return ".volume";
    },
    get circle() {
        return ".circle";
    },
    get foreground() {
        return "".concat(this.circle, ".foreground");
    },
    get background() {
        return "".concat(this.circle, ".background");
    }
});
var minmax = function (x) { return Math.min(100, Math.max(0, x)); };
// ***
var lastMedia = null;
document.addEventListener('wheel', function (event) {
    var _a, _b, _c;
    var mediaElementList = Array.from(document.querySelectorAll('video, audio'));
    var media = (_b = (_a = mediaElementList === null || mediaElementList === void 0 ? void 0 : mediaElementList.flatMap(function (element, _i, _a) {
        var count = _a.length;
        validMediaVerification: {
            condition: {
                if (count === 1 || element.paused === false)
                    break condition;
                break validMediaVerification;
            }
            return element;
        }
        return [];
    })[0]) !== null && _a !== void 0 ? _a : lastMedia) !== null && _b !== void 0 ? _b : null;
    lastMedia = media;
    var controller = (_c = document.querySelector(DOM_SELECTORS.container)) !== null && _c !== void 0 ? _c : null;
    if (media === null)
        return;
    if (controller === null)
        return;
    if (event.altKey === false)
        return;
    event.preventDefault();
    // ---
    // prettier-ignore
    var valuePerWheel = event.ctrlKey === true && event.shiftKey === true
        ? 50
        : event.ctrlKey === true && event.shiftKey === false
            ? 10
            : event.ctrlKey === false && event.shiftKey === false
                ? 5
                : 1;
    var currentVolume = Math.ceil(media.volume * Math.pow((Math.pow(100, (1 / 4))), 4));
    var newVolume = Math.floor(minmax(currentVolume + Math.sign(event.deltaY) * valuePerWheel * -1));
    var newVolumeAsString = String(newVolume);
    media.volume = newVolume / 100;
    controller.style.setProperty('--current-volume-percent', newVolumeAsString);
    controller.querySelector(DOM_SELECTORS.volume).textContent =
        newVolumeAsString;
}, { passive: false });
