import data from './data';

const container = document.querySelector('.available-pieces');
container.innerHTML = '';

const nodes = data.map((node) => {
  const li = document.createElement('li');
  // li.style.backgroundColor = node.css;

  const input = document.createElement('input');
  input.type = 'color';
  input.name = node.label;
  input.value = rgb2hex(node.css);

  li.appendChild(input);

  const span = document.createElement('span');
  span.textContent = node.label;
  li.appendChild(span);

  requestAnimationFrame(() => {
    container.appendChild(li);
  });
});
