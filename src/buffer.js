export default class AVBuffer {
  constructor(input) {
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(input)) {
      this.data = Uint8Array.from(input);
    } else if (input instanceof Uint8Array) {
      // Uint8Array
      this.data = input;
    } else if (input instanceof ArrayBuffer || Array.isArray(input) || (typeof input === 'number')) {
      // ArrayBuffer || Normal JS Array || Number (i.e. length) || Node Buffer
      this.data = new Uint8Array(input);
    } else if (input.buffer instanceof ArrayBuffer) {
      // typed arrays other than Uint8Array
      this.data = new Uint8Array(input.buffer, input.byteOffset, input.length * input.BYTES_PER_ELEMENT);
    } else if (input instanceof AVBuffer) {
      // AVBuffer, make a shallow copy
      this.data = input.data;
    } else {
      throw new Error('Constructing buffer with unknown type.');
    }

    this.length = this.data.length;

    // used when the buffer is part of a bufferlist
    this.next = null;
    this.prev = null;
  }

  static allocate(size) {
    return new AVBuffer(size);
  }

  copy() {
    return new AVBuffer(new Uint8Array(this.data));
  }

  slice(position, length = this.length) {
    if ((position === 0) && (length >= this.length)) {
      return new AVBuffer(this.data);
    }
    return new AVBuffer(this.data.subarray(position, position + length));
  }

  static makeBlob(data, type = 'application/octet-stream') {
    return new Blob([data], { type });
  }

  static makeBlobURL(data, type) {
    return URL.createObjectURL(this.makeBlob(data, type));
  }

  static revokeBlobURL(url) {
    URL.revokeObjectURL(url);
  }

  toBlob() {
    return AVBuffer.makeBlob(this.data.buffer);
  }

  toBlobURL() {
    return AVBuffer.makeBlobURL(this.data.buffer);
  }
}
