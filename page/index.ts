const mustAsk = Boolean(location.hash === '#ask');
const templateHTTP = fetch(
  'https://raw.githubusercontent.com/ruanmoreiraofc/' +
    location.pathname.split('/')[1] +
    '/main/main.html',
);

document.addEventListener('DOMContentLoaded', async () => {
  const response = await templateHTTP;
  const responseAsText = await response.text();

  const template = document.createElement('template');
  template.innerHTML = responseAsText;

  if (response.ok !== true) return;
  if ('content' in template === false) {
    alert('Your browser do not support html templates!');

    return;
  }

  const quantityDefault = 4;
  const quantity = Math.min(
    100,
    Math.max(
      0,
      mustAsk
        ? Number(
            prompt(
              'Please enter a quantity of elements do you want to display:',
              String(quantityDefault),
            ),
          ) || quantityDefault
        : quantityDefault,
    ),
  );

  for (let i = 0; i <= quantity; i++) {
    const percent = String(
      i === 0 //
        ? 0
        : Math.floor(100 / quantity) * i,
    );

    // prettier-ignore
    const clone =(
        document
          .importNode(template.content, true)
          .firstElementChild
      ) as HTMLElement;
    clone.querySelector('text')!.textContent = percent;
    clone.style.setProperty('--current-volume-percent', percent);

    document.querySelector('#template-container')?.appendChild(clone);
  }
});
