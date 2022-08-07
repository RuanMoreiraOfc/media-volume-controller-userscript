const DOM_SELECTORS = Object.freeze({
  get container() {
    return '#media-volume-controller-userscript';
  },
  get content() {
    return `.content`;
  },
  get volume() {
    return `.volume`;
  },
  get circle() {
    return `.circle`;
  },
  get foreground() {
    return `${this.circle}.foreground`;
  },
  get background() {
    return `${this.circle}.background`;
  },
});

const minmax = (x: number) => Math.min(100, Math.max(0, x));

// ***

let lastMedia = null;

document.addEventListener(
  'wheel',
  (event) => {
    const mediaElementList = Array.from(
      document.querySelectorAll<HTMLMediaElement>('video, audio'),
    );
    const media =
      mediaElementList?.flatMap((element, _i, { length: count }) => {
        validMediaVerification: {
          condition: {
            if (count === 1 || element.paused === false) break condition;

            break validMediaVerification;
          }

          return element;
        }

        return [];
      })[0] ??
      lastMedia ??
      null;

    lastMedia = media;

    const controller =
      document.querySelector<HTMLElement>(DOM_SELECTORS.container) ?? null;

    if (media === null) return;
    if (controller === null) return;
    if (event.altKey === false) return;

    event.preventDefault();

    // ---

    // prettier-ignore
    const valuePerWheel =
      event.ctrlKey === true && event.shiftKey === true
        ? 50
        : event.ctrlKey === true && event.shiftKey === false
          ? 10
          : event.ctrlKey === false && event.shiftKey === false
            ? 5
            : 1;

    const currentVolume = Math.ceil(media.volume * (100 ** (1 / 4)) ** 4);
    const newVolume = Math.floor(
      minmax(currentVolume + Math.sign(event.deltaY) * valuePerWheel * -1),
    );
    const newVolumeAsString = String(newVolume);

    media.volume = newVolume / 100;
    controller.style.setProperty('--current-volume-percent', newVolumeAsString);
    controller.querySelector(DOM_SELECTORS.volume)!.textContent =
      newVolumeAsString;
  },
  { passive: false },
);
