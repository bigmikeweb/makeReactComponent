#!/usr/bin/env node
const makeComponent = require("./makeComponent.js");
const args = process.argv.slice(2);
const work = (name) => {
  try {
    name
      ? makeComponent(name) &&
        console.log(`${name} component directory was successfully created!`)
      : console.log(
          "Failed to create component directory due to a bad input!" +
            `Input was ${name}`
        );
  } catch (error) {
    console.log(error);
  }
};
args.forEach(work);
