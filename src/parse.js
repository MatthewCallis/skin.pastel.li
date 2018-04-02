import AVBuffer from './buffer';
import AVBufferList from './bufferlist';
import AVStream from './stream';
import buf2hex from './buf2hex';

function readFile(file) {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    const buffer = new AVBuffer(new Uint8Array(reader.result));
    const stream = AVStream.fromBuffer(buffer);
    let output = '';
    output += `File Size: ${buffer.length}\n`;
    const header_valid = buf2hex(stream.readSingleBuffer(9).data) === 'ab1e567804cf000000';
    output += `Header: ${header_valid ? 'Valid' : 'Invalid'}\n`;
    if (header_valid) {
      let chunk = 0;
      let color_count = 0;
      const colors = [];
      while (stream.remainingBytes()) {
        let length_hi;
        let length_hi_value_hi;
        let length_hi_value_lo;
        let length_lo;
        let string = '';

        // NOTE: 1888 is the size of all colors in the table.
        if (stream.offset >= (buffer.length - 1888)) {
          let i = 0;
          const color = [];
          while (i < 4) {
            color.push(stream.readFloat32(true));
            i += 1;
          }
          colors.push(color);

          output += `Color ${color_count}: ${color.join(',')}\n`;
          setOutput(output.replace(/\0/g, ''));

          color_count += 1;
        } else {
          // Read Label Length
          length_hi = stream.readInt8();
          length_lo = stream.readInt8();

          if (length_hi) {
            // Skip 2 blank bytes?
            stream.advance(2);
            // Read Label
            string = stream.readString(length_hi * 2);

            // Special Cases
            if (string.replace(/\0/g, '') === 'Value') {
              string += `: ${stream.readInt8()}`;
            } else {
              // Read again
              length_hi_value_hi = stream.readInt8();
              length_hi_value_lo = stream.readInt8();
              if (length_hi_value_hi) {
                console.warn('TODO: length_hi_value_hi');
                string += `: ${stream.readString(length_hi_value_hi)}`;
              } else if (length_hi_value_lo) {
                string += `: ${stream.readString(length_hi_value_lo)}`;
              }
            }
          } else if (length_lo) {
            // Read Label
            string = stream.readString(length_lo);
            // Read Value
            string += `: ${buf2hex(stream.readSingleBuffer(4).data)}`;
          } else {
            console.error('No Length?');
          }

          output += `Chunk ${chunk}: ${string}\n`;
          setOutput(output.replace(/\0/g, ''));
          chunk += 1;
        }
      }
    }
    setOutput(output);
  });
  reader.readAsArrayBuffer(file);
}

output.addEventListener('dragover', (event) => {
  event.stopPropagation();
  event.preventDefault();
}, true);

output.addEventListener('drop', (event) => {
  event.preventDefault();
  event.stopPropagation();

  const data_transfer = event.dataTransfer;
  if (data_transfer.items) {
    for (let i = 0; i < data_transfer.items.length; i++) {
      if (data_transfer.items[i].kind === 'file') {
        readFile(data_transfer.items[i].getAsFile());
      }
    }
  } else {
    for (let i = 0; i < data_transfer.files.length; i++) {
      readFile(data_transfer.files[i].name);
    }
  }
});

output.addEventListener('dragend', (event) => {
  event.preventDefault();
  event.stopPropagation();

  const data_transfer = event.dataTransfer;
  if (data_transfer.items) {
    for (let i = 0; i < data_transfer.items.length; i++) {
      data_transfer.items.remove(i);
    }
  } else {
    event.dataTransfer.clearData();
  }
});

setOutput(uploaded_files);
