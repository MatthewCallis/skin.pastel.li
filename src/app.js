import { assoc, clone } from 'ramda';
import data from './data';
import template from './template';
import drawPreview from './canvas';
import hexToRGB from './hexToRGB';

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength >>= 0; // floor if number or convert non-number to 0;
    padString = String(padString || ' ');
    if (this.length > targetLength) {
      return String(this);
    }

    targetLength -= this.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); // append to original to ensure we are longer than needed
    }
    return padString.slice(0, targetLength) + String(this);
  };
}

let colors = clone(data);

const canvas = document.getElementById('background-preview');
const el_width = canvas.width;
const el_height = canvas.height;
canvas.width = el_width * window.devicePixelRatio;
canvas.height = el_height * window.devicePixelRatio;
canvas.style.width = `${el_width}px`;

const ctx = canvas.getContext('2d');
ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

const inputs = document.querySelectorAll('ul.available-pieces li input[type="color"]');
const ranges = document.querySelectorAll('ul.available-pieces li input[type="range"]');

function updateColors(key) {
  const color = hexToRGB(document.querySelector(`ul.available-pieces li input[type="color"][name="${key}"]`).value, 10);
  const alpha = parseInt(document.querySelector(`ul.available-pieces li input[type="range"][name="${key}"]`).value, 10);
  colors = assoc(key, {
    r: color[0],
    g: color[1],
    b: color[2],
    a: alpha,
  }, colors);
  drawPreview(canvas, colors);
}

function setColor(event) {
  const parent = event.target.parentNode;
  parent.style.backgroundColor = event.target.value;

  const key = parseInt(event.target.name, 10);
  updateColors(key);
}

function setAlpha(event) {
  const parent = event.target.parentNode;
  parent.style.opacity = (event.target.value / 255).toFixed(4);

  const key = parseInt(event.target.name, 10);
  updateColors(key);
}

Object.keys(data).forEach((key, i) => {
  const node = data[key];
  inputs[i].addEventListener('change', setColor);
  inputs[i].addEventListener('input', setColor);
  ranges[i].addEventListener('change', setAlpha);
  ranges[i].addEventListener('input', setAlpha);

  const parent = inputs[i].parentNode;
  const color = `#${(`0${node.r.toString(16)}`).slice(-2)}${(`0${node.g.toString(16)}`).slice(-2)}${(`0${node.b.toString(16)}`).slice(-2)}`;

  inputs[i].value = color;
  ranges[i].value = node.a;
  parent.style.backgroundColor = color;
  parent.style.opacity = (node.a / 255).toFixed(4);
});

function swap32(value) {
  return ((value & 0xFF) << 24)
       | ((value & 0xFF00) << 8)
       | ((value >> 8) & 0xFF00)
       | ((value >> 24) & 0xFF);
}

function toFloat32(value) {
  const view = new DataView(new ArrayBuffer(4));
  view.setFloat32(0, value);
  return swap32(view.getInt32(0)).toString(16).padStart(8, '0');
}


function makeDownload(blobUrl, filename) {
  const download = document.querySelector('a.download');
  download.href = blobUrl;
  download.download = filename;
  download.style.display = 'block';
}

function onSave() {
  let output = template;
  Array.from(inputs).forEach((node, i) => {
    const color = node.value.substring(1);
    const bytes = hexToRGB(color);
    const r = toFloat32(bytes[0]);
    const g = toFloat32(bytes[1]);
    const b = toFloat32(bytes[2]);
    const alpha = toFloat32(ranges[i].value);
    // console.log('Color: ', r, g, b, alpha);
    output += `${r}${g}${b}${alpha}`;
  });
  const color_table = hexToRGB(output);
  const file_data = new Uint8Array(color_table);
  const blob = new Blob([file_data], { type: 'application/octet-stream' });
  const blobURL = URL.createObjectURL(blob);
  makeDownload(blobURL, `pastelli_skin_${Date.now()}.ask`);
}

const save = document.querySelector('button.save');
save.addEventListener('click', onSave);

// Render
drawPreview(canvas, data);
