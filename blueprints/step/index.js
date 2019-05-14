'use strict';

const { readdirSync } = require('fs');
const { join } = require('path');


let existingFiles = readdirSync(join(process.cwd(), 'content', 'steps'));

let numbers = existingFiles.map((filename) => {
  let num = parseInt(filename.split('-')[1])

  if(Number.isNaN(num)) {
    return 1;
  }

  return num;
});

let highestNumber = Math.max(...numbers, 0);

let numberString = (highestNumber + 1).toString().padStart(3, '0');

module.exports = {
  description: 'A simple blueprint to create a new step markdown file',

  normalizeEntityName() {
    // no-op
  },

  fileMapTokens() {
    // Return custom tokens to be replaced in your files
    return {
      __number__() {
        return numberString
      }
    };
  },

  locals() {
    return {
      step: (highestNumber + 1)
    };
  },
};
