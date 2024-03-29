// ==UserScript==
// @name         Media Volume Controller
// @version      1.0.2
// @homepage     https://ruanmoreiraofc.github.io/media-volume-controller-userscript/#ask
// @description  Allow the user to change the volume from a media element(video, audio) by the wheel of the mouse
// @author       Ruan Moreira (github.com/ruanmoreiraofc)

// @downloadURL  https://github.com/ruanmoreiraofc/media-volume-controller-userscript/raw/v1.0.2/script.js
// @updateURL    https://github.com/ruanmoreiraofc/media-volume-controller-userscript/raw/main/script.js
// @supportURL   https://github.com/ruanmoreiraofc/media-volume-controller-userscript/issues

// @include      *

// @grant        GM_getResourceURL
// @grant        GM_getResourceText
// @resource     component https://github.com/RuanMoreiraOfc/media-volume-controller-userscript/raw/v1.0.2/main.html
// @resource     style https://github.com/RuanMoreiraOfc/media-volume-controller-userscript/raw/v1.0.2/docs/main.css
// @resource     script https://github.com/RuanMoreiraOfc/media-volume-controller-userscript/raw/v1.0.2/docs/main.js
// @run-at       document-end
// ==/UserScript==

// @ts-check
{
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  // @ts-expect-error
  link.href = GM_getResourceURL('style');

  const script = document.createElement('script');
  // @ts-expect-error
  script.src = GM_getResourceURL('script');

  const container = document.createElement('div');
  // @ts-expect-error
  container.innerHTML = GM_getResourceText('component');

  // ***

  container.appendChild(link);
  container.appendChild(script);
  document.body.appendChild(container);

  // ***

  let lastMedia = null;
  let timer = null;
  container.hidden = true;

  document.addEventListener('wheel', (event) => {
    const mediaElementList = Array.from(
      document.querySelectorAll('video, audio'),
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

    if (media === null) return;
    if (event.altKey === false) return;

    clearTimeout(timer);
    timer = setTimeout(() => {
      container.hidden = true;
    }, 1500);

    container.hidden = false;
  });
}
