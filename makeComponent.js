const sh = require("shelljs");
const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1)
  );
};
const makeFileNames = (name) => {
  const componentName = toTitleCase(name);
  return {
    component: `${componentName}.jsx`,
    styleSheet: `${name}.css`,
    index: `index.js`,
  };
};

const makeComponent = (name) => {
  sh.cd("src/components");
  const { component, styleSheet, index } = makeFileNames(name);
  const componentVar = component.slice(0, -4);
  sh.mkdir(name);
  sh.cd(name);
  sh.touch([component, styleSheet, index]);
  sh.ShellString(`export {default} from "./${componentVar}"`).to(index);
  sh.ShellString(
    `import "./${styleSheet}"
const ${componentVar} = () => {
  return (
    <div>
      ${componentVar}
    </div>
  )
}

export default ${componentVar}`
  ).to(component);

  sh.cd("../../..");
};

module.exports = makeComponent;
