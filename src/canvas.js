// Canvas Stuff
class UI {
  static circle(ctx, x, y, radius, options = {}) {
    UI.complexShape(ctx, [
      {
        command: 'arc',
        args: [x, y, radius, 0, 2 * Math.PI],
      },
    ], options);
  }

  static rectangle(ctx, x, y, width, heigh, options = {}) {
    UI.complexShape(ctx, [
      {
        command: 'fillRect',
        args: [x, y, width, heigh],
      },
    ], options);
  }

  static rectangleOutline(ctx, x, y, width, heigh, options = {}) {
    UI.complexShape(ctx, [
      {
        command: 'strokeRect',
        args: [x, y, width, heigh],
      },
    ], options);
  }

  static roundedRectangle(ctx, x, y, width, height, radius, fillStyle, strokeStyle) {
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.closePath();
    if (fillStyle) {
      ctx.fill();
    }
    if (strokeStyle) {
      ctx.stroke();
    }
  }

  static text(ctx, text, x, y, options = {}) {
    UI.complexShape(ctx, [
      {
        command: 'fillText',
        args: [text, x, y],
      },
    ], options);
  }

  static triangle(ctx, points = [], options = {}) {
    UI.complexShape(ctx, [
      {
        command: 'moveTo',
        args: [...points[0]],
      },
      {
        command: 'lineTo',
        args: [...points[1]],
      },
      {
        command: 'lineTo',
        args: [...points[2]],
      },
    ], options);
  }

  static drawPanelIcon(ctx, fill, stroke, x, y) {
    UI.roundedRectangle(ctx, x + 0.5, y + 0.5, 14, 10, 1, null, stroke);
    ctx.fillStyle = fill;
    ctx.lineWidth = 1;
    ctx.fillRect(x + 1, y + 3, 13, 7);
  }

  static drawFolderIcon(ctx, fill, stroke, x, y) {
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;

    // Base
    // ctx.fillRect(x + 0.5, y + 2.5, 14, 10);
    ctx.strokeRect(x + 0.5, y + 2.5, 14, 10);

    // Tab
    ctx.fillRect(x + 0.5, y + 0.5, 6, 4);
    // ctx.strokeRect(x + 0.5, y + 0.5, 6, 4);

    // Tab Fill
    ctx.fillStyle = fill;
    ctx.fillRect((x + 1), (y + 1), 5, 2);
  }

  static complexShape(ctx, pahtPieces = [], options = {}) {
    ctx.fillStyle = options.fill || 'transparent';
    ctx.strokeStyle = options.stroke || 'transparent';
    ctx.lineWidth = options.lineWidth || 1;
    ctx.font = options.font || '';
    ctx.beginPath();
    pahtPieces.forEach((piece) => {
      ctx[piece.command](...piece.args);
    });
    ctx.closePath();
    if (options.fill) {
      ctx.fill();
    }
    if (options.stroke) {
      ctx.stroke();
    }
  }
}

function drawInnerDarkBox(ctx, color, radius = 7) {
  UI.complexShape(ctx, [
    {
      command: 'moveTo',
      args: [6, 36],
    },
    {
      command: 'lineTo',
      args: [6, 480],
    },
    {
      command: 'arcTo',
      args: [6, 485, 11, 485, radius],
    },
    {
      command: 'lineTo',
      args: [24, 485],
    },
    {
      command: 'arcTo',
      args: [30, 485, 30, 490, radius],
    },
    {
      command: 'lineTo',
      args: [30, 504],
    },
    {
      command: 'arcTo',
      args: [30, 509, 35, 509, radius],
    },
    {
      command: 'lineTo',
      args: [429, 509],
    },
    {
      command: 'arcTo',
      args: [434, 509, 434, 504, radius],
    },
    {
      command: 'lineTo',
      args: [434, 11],
    },
    {
      command: 'arcTo',
      args: [434, 6, 429, 6, radius],
    },
    {
      command: 'lineTo',
      args: [35, 6],
    },
    {
      command: 'arcTo',
      args: [30, 6, 30, 11, radius],
    },
    {
      command: 'lineTo',
      args: [30, 22],
    },
    {
      command: 'arcTo',
      args: [30, 28, 24, 28, radius],
    },
    {
      command: 'lineTo',
      args: [11, 28],
    },
    {
      command: 'arcTo',
      args: [6, 28, 6, 35, radius],
    },

  ], { fill: color });
}

function drawSearchBox(ctx, color) {
  UI.rectangle(ctx, 35, 11, 394, 17, { fill: color });
}

function drawSearchBoxText(ctx, placeholder_color, text_color) {
  UI.text(ctx, 'Search (Cmd + F)', 42, 23, { fill: placeholder_color, font: '7.5pt Arial, Helvetica, sans-serif' });
}

function drawToggleDrawerCircle(ctx, color) {
  UI.circle(ctx, 15.5, 15.5, 9.5, { fill: color });
}

function drawGrooveDrawerCircle(ctx, color) {
  UI.circle(ctx, 15.5, 499.5, 9.5, { fill: color });
}

function drawToggleDrawerPlayButton(ctx, color) {
  UI.triangle(ctx, [
    [11, 10],
    [22.5, 15.5],
    [11, 21],
  ], { fill: color });
}

function drawCategoryBox(ctx, color) {
  UI.rectangle(ctx, 11, 33, 100, 447, { fill: color });
}

function drawCategoryBoxHighlight(ctx, active, inactive) {
  UI.rectangle(ctx, 11, 109, 100, 18, { fill: inactive });
  UI.drawFolderIcon(ctx, inactive, '#000000', '#506f6f', 15, 111);
}

function drawCategoryBoxTitleText(ctx, color) {
  const options = { fill: color, font: 'bold 7.5pt Arial, Helvetica, sans-serif' };
  UI.text(ctx, 'CATEGORIES', 15, 45.5, options);
  UI.text(ctx, 'PLACES', 18, 254.5, options);
}

function drawCategoryBoxOptionsText(ctx, color) {
  const options = { fill: color, font: 'bold 7pt Arial, Helvetica, sans-serif' };
  UI.text(ctx, 'Sounds', 35, 64, options);
  UI.text(ctx, 'Drums', 35, 83, options);
  UI.text(ctx, 'Instruments', 35, 102, options);
  UI.text(ctx, 'Audio Effects', 35, 121, options);
  UI.text(ctx, 'MIDI Effects', 35, 140, options);
  UI.text(ctx, 'Max for Live', 35, 159, options);
  UI.text(ctx, 'Plug-Ins', 35, 178, options);
  UI.text(ctx, 'Clips', 35, 197, options);
  UI.text(ctx, 'Samples', 35, 216, options);

  UI.text(ctx, 'Pasteli', 35, 273, options);
  UI.text(ctx, 'Skin', 35, 292, options);
  UI.text(ctx, 'Editor', 35, 311, options);
  UI.text(ctx, 'skin.pastel.li', 35, 330, options);
  UI.text(ctx, 'Add Folder...', 35, 349, options);

  UI.rectangle(ctx, 34, 351, 58, 1, { fill: color });
}

function drawCategoryIcons(ctx, fill, stroke) {
  UI.drawFolderIcon(ctx, fill, stroke, 15, 54);
  UI.drawFolderIcon(ctx, fill, stroke, 15, 73);
  UI.drawFolderIcon(ctx, fill, stroke, 15, 92);
  // UI.drawFolderIcon(ctx, fill, stroke, 15, 111); // Highlight
  UI.drawFolderIcon(ctx, fill, stroke, 15, 130);
  UI.drawFolderIcon(ctx, fill, stroke, 15, 149);
  UI.drawFolderIcon(ctx, fill, stroke, 15, 168);
  UI.drawFolderIcon(ctx, fill, stroke, 15, 187);
  UI.drawFolderIcon(ctx, fill, stroke, 15, 206);

  UI.drawFolderIcon(ctx, fill, stroke, 15, 263);
  UI.drawFolderIcon(ctx, fill, stroke, 15, 282);
  UI.drawFolderIcon(ctx, fill, stroke, 15, 301);
  UI.drawFolderIcon(ctx, fill, stroke, 15, 320);

  // Add Folder Icon
  UI.circle(ctx, 22.5, 345.5, 6, { stroke });

  // Add Folder Icon Plus
  UI.rectangle(ctx, 22, 343, 1, 5, { fill: stroke });
  UI.rectangle(ctx, 20, 345, 5, 1, { fill: stroke });
}

function drawOptionsTableHeader(ctx, color) {
  UI.rectangle(ctx, 114, 33, 315, 19, { fill: color });
}

function drawOptionsTableHeaderText(ctx, color) {
  UI.text(ctx, 'Name', 118, 45.5, { fill: color, font: 'bold 7pt Arial, Helvetica, sans-serif' });
}

function drawOptionsTableHeaderArrow(ctx, color) {
  UI.rectangle(ctx, 413, 33, 1, 19, { fill: color });

  // Up Arrow
  UI.triangle(ctx, [
    [405.5, 39.5],
    [402, 46],
    [409, 46],
  ], { fill: color });
}

function drawOptionsTableBody(ctx, color) {
  UI.rectangle(ctx, 114, 52, 315, 428, { fill: color });
}

function drawOptionsTableBodyHighlight(ctx, active, inactive) {
  UI.rectangle(ctx, 114, 71, 300, 18, { fill: active });
  UI.drawPanelIcon(ctx, '#4f6b66', '#1b2423', 130, 74);
}

function drawOptionsTableText(ctx, color) {
  const options = { fill: color, font: 'bold 7pt Arial, Helvetica, sans-serif' };
  UI.text(ctx, 'Amp', 150, 64, options);
  UI.text(ctx, 'Audio Effect Rack', 150, 83, options);
  UI.text(ctx, 'Auto Filter', 150, 102, options);
  UI.text(ctx, 'Auto Pan', 150, 121, options);
  UI.text(ctx, 'Beat Repeat', 150, 140, options);
  UI.text(ctx, 'Cabinet', 150, 159, options);
  UI.text(ctx, 'Chorus', 150, 178, options);
  UI.text(ctx, 'Compressor', 150, 197, options);
  UI.text(ctx, 'Corpus', 150, 216, options);
  UI.text(ctx, 'Dynamic Tube', 150, 235, options);
  UI.text(ctx, 'EQ Eight', 150, 254, options);
  UI.text(ctx, 'EQ Three', 150, 273, options);
  UI.text(ctx, 'Erosion', 150, 292, options);
  UI.text(ctx, 'External Audio Effect', 150, 311, options);
  UI.text(ctx, 'Filter Delay', 150, 330, options);
  UI.text(ctx, 'Flanger', 150, 349, options);
  UI.text(ctx, 'Frequency Shifter', 150, 368, options);
  UI.text(ctx, 'Gate', 150, 387, options);
  UI.text(ctx, 'Glue Compressor', 150, 406, options);
  UI.text(ctx, 'Grain Delay', 150, 425, options);
  UI.text(ctx, 'Limiter', 150, 444, options);
  UI.text(ctx, 'Looper', 150, 463, options);
}

function drawOptionsTableIcons(ctx, fill, stroke) {
  // Folders
  UI.drawPanelIcon(ctx, fill, stroke, 130, 55);
  // UI.drawPanelIcon(ctx, fill, stroke, 130, 74); // highlight icon
  UI.drawPanelIcon(ctx, fill, stroke, 130, 93);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 112);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 131);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 150);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 169);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 188);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 207);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 226);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 245);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 264);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 283);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 302);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 321);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 340);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 359);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 378);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 397);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 416);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 435);
  UI.drawPanelIcon(ctx, fill, stroke, 130, 454);
}

function drawPanelIconArrow(ctx, fill, stroke, x, y) {
  UI.triangle(ctx, [
    [x + 0.5, y + 2.5],
    [x + 5.5, y + 5.5],
    [x + 0.5, y + 8.5],
  ], { fill, stroke });
}

function drawOptionsTableArrows(ctx, fill, stroke) {
  // Folders
  drawPanelIconArrow(ctx, fill, stroke, 119, 55);
  drawPanelIconArrow(ctx, fill, stroke, 119, 74);
  drawPanelIconArrow(ctx, fill, stroke, 119, 93);
  drawPanelIconArrow(ctx, fill, stroke, 119, 112);
  drawPanelIconArrow(ctx, fill, stroke, 119, 131);
  drawPanelIconArrow(ctx, fill, stroke, 119, 150);
  drawPanelIconArrow(ctx, fill, stroke, 119, 169);
  drawPanelIconArrow(ctx, fill, stroke, 119, 188);
  drawPanelIconArrow(ctx, fill, stroke, 119, 207);
  drawPanelIconArrow(ctx, fill, stroke, 119, 226);
  drawPanelIconArrow(ctx, fill, stroke, 119, 245);
  drawPanelIconArrow(ctx, fill, stroke, 119, 264);
  drawPanelIconArrow(ctx, fill, stroke, 119, 283);
  drawPanelIconArrow(ctx, fill, stroke, 119, 302);
  drawPanelIconArrow(ctx, fill, stroke, 119, 321);
  drawPanelIconArrow(ctx, fill, stroke, 119, 340);
  drawPanelIconArrow(ctx, fill, stroke, 119, 359);
  drawPanelIconArrow(ctx, fill, stroke, 119, 378);
  drawPanelIconArrow(ctx, fill, stroke, 119, 397);
  drawPanelIconArrow(ctx, fill, stroke, 119, 416);
  drawPanelIconArrow(ctx, fill, stroke, 119, 435);
  drawPanelIconArrow(ctx, fill, stroke, 119, 454);
}

function drawOptionsTableScrollbars(ctx, color) {
  UI.rectangle(ctx, 417, 67, 9, 253, { fill: color });

  // Up Arrow
  UI.triangle(ctx, [
    [421.5, 55.5],
    [417.5, 63.5],
    [425.5, 63.5],
  ], { fill: color });

  // Down Arrow
  UI.triangle(ctx, [
    [417.5, 468.5], // pick up "pen," reposition
    [425.5, 468.5], // draw straight across to right
    [421.5, 476.5], // draw down toward left
  ], { fill: color });
}

function drawPreviewBox(ctx, color) {
  UI.rectangle(ctx, 35, 485, 394, 19, { fill: color });
}

function drawPreviewBoxInside(ctx, color, color2) {
  UI.rectangleOutline(ctx, 55.5, 487.5, 370, 14, { stroke: color2 });
  UI.rectangle(ctx, 56, 488, 369, 13, { fill: color });
}

function drawPreviewBoxButton(ctx, color, color2) {
  UI.circle(ctx, 45.5, 494.5, 6, { fill: color, stroke: color2 });
}

function toRGBA(color, alpha) {
  return `rgba(${color.r},${color.g},${color.b},${((alpha || color.a) / 255)})`;
}

export default function drawPreview(canvas, colors) {
  requestAnimationFrame(() => {
    // get canvas 2d contex to draw on
    const ctx = canvas.getContext('2d');
    // draw the background
    ctx.fillStyle = toRGBA(colors[8]); // 🎨
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawInnerDarkBox(ctx, toRGBA(colors[96])); // 🎨 active: 96
    drawSearchBox(ctx, toRGBA(colors[65])); // 🎨
    drawSearchBoxText(ctx, toRGBA(colors[52]), toRGBA(colors[59])); // 🎨 placeholder, search value
    drawToggleDrawerCircle(ctx, toRGBA(colors[7])); // 🎨
    drawToggleDrawerPlayButton(ctx, toRGBA(colors[8])); // 🎨
    drawGrooveDrawerCircle(ctx, toRGBA(colors[7])); // 🎨
    drawCategoryBox(ctx, toRGBA(colors[49])); // 🎨
    drawCategoryBoxHighlight(ctx, toRGBA(colors[47]), toRGBA(colors[48])); // 🎨 47: highlight inactive, highlight active
    // drawCategoryBoxTitleBackground(ctx, toRGBA(colors[107])); // 🎨
    drawCategoryBoxTitleText(ctx, toRGBA(colors[106])); // 🎨
    drawCategoryBoxOptionsText(ctx, toRGBA(colors[1])); // 🎨
    drawCategoryIcons(ctx, toRGBA(colors[1], 104), toRGBA(colors[1])); // 🎨
    drawOptionsTableHeader(ctx, toRGBA(colors[101]), toRGBA(colors[103]), toRGBA(colors[104]));  // 🎨
    drawOptionsTableHeaderText(ctx, toRGBA(colors[102])); // 🎨
    drawOptionsTableHeaderArrow(ctx, toRGBA(colors[105])); // 🎨
    drawOptionsTableBody(ctx, toRGBA(colors[49])); // 🎨
    drawOptionsTableBodyHighlight(ctx, toRGBA(colors[47]), toRGBA(colors[48])); // 🎨 47: highlight inactive, highlight active
    drawOptionsTableText(ctx, toRGBA(colors[1])); // 🎨
    drawOptionsTableIcons(ctx, toRGBA(colors[1], 124), toRGBA(colors[1])); // 🎨
    drawOptionsTableArrows(ctx, toRGBA(colors[15]), toRGBA(colors[62])); // 🎨 border 62, fill 15
    drawOptionsTableScrollbars(ctx, toRGBA(colors[11])); // 🎨
    drawPreviewBox(ctx, toRGBA(colors[49])); // 🎨
    drawPreviewBoxInside(ctx, toRGBA(colors[65]), toRGBA(colors[7])); // 🎨 fill 65, border 7
    drawPreviewBoxButton(ctx, toRGBA(colors[18]), toRGBA(colors[62]), toRGBA(colors[1])); // 🎨
  });
}
