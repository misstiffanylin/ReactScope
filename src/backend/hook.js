const instances = window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers;
const instance = instances[Object.keys(instances)[0]];

function getInstance() {
  return instance;
}

export default getInstance;
