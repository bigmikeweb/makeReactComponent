const sh = require("shelljs");
const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};
const makeFileNames = (name) => {
  const componentName = toTitleCase(name);
  return {
    component: `${componentName}.js`,
    styleSheet: `${name}.css`,
    index: `index.js`,
  };
};

const makeComponent = (name) => {
  const lowerName = name.toLowerCase();
  const { component, styleSheet, index } = makeFileNames(lowerName);
  const componentVar = component.slice(0, -3);
  sh.mkdir(componentVar);
  sh.cd(componentVar);
  sh.touch([component, styleSheet, index]);
  sh.ShellString(`export {default} from "./${styleSheet}"`).to(index);
  sh.ShellString(
    `import "./${styleSheet}"
const ${componentVar} = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default ${componentVar}`
  ).to(component);
  sh.cd("..");
};

module.exports = makeComponent;
