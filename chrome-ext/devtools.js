let storage = {};

chrome.devtools.panels.create(
  'React-Scope-Test',//title of the panel
  null, //the path to the icon
  'devtools.html', //html page for injecting into the tab's content
  sendMessage //callback function optional
);

let cleanData = []

function sendMessage() {
  console.log('React-Scope-Test s Console')
  let port = chrome.runtime.connect({
    name: "lcmkobafpahiadgbnmjhhgoibckdbeko",
  });
  port.postMessage({
    name: 'connect',
    tabId: chrome.devtools.inspectedWindow.tabId
  })
  port.onMessage.addListener((msg) => {
    if (!msg.data) {
      console.log(msg)
      console.log('There is no data');
    }
    else {
      console.log(msg, "raw data")
      let reactData = msg;
      if (reactData.data.head) {
        reactData = reactData.data.head.value.currentState[1].children[3]
        cleanData.push(getChildren(reactData))
        // console.log('cleanData', cleanData);
        let mostCurrent = cleanData[cleanData.length - 1];
        let current = mostCurrent;
        document.getElementById('app').innerHTML = '';        
        for (let i = 0; i < mostCurrent.length; i++) {
          console.log('mostCurrent', mostCurrent[i]);
      
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('stateCard');
            cardDiv.id = `stateCard: ${i}`;
            document.getElementById('app').appendChild(cardDiv);

            //capture name
            const nameData = document.createTextNode('Name: ' + mostCurrent[i].name + '\n');
            // console.log('nameData', nameData);
            nameData.id = 'nameData';
            document.getElementById(`stateCard: ${i}`).appendChild(nameData);             
            //capture state
            if (mostCurrent[i].state !== null) {
              for (var key in mostCurrent[i].state) {
                if (typeof mostCurrent[i].state[key] === 'boolean') {
                  console.log('boolean found');
                  const stateData = document.createTextNode('State: ' + key.toString() + ': ' + mostCurrent[i].state[key] + '\n');                
                  document.getElementById(`stateCard: ${i}`).appendChild(stateData); 
                } else if (Array.isArray(mostCurrent[i].state[key])) {
                  let string = '[';
                  mostCurrent[i].state[key].forEach((elem) => {
                    string += '['
                    string += elem.toString();
                    string += '],\n';
                  });
                  string += ']';
                  const stateData = document.createTextNode('State: ' + string + '\n');
                  document.getElementById(`stateCard: ${i}`).appendChild(stateData);                   
                }                   
              }              
            }
            //capture props 
            //parse through array, object, string, boolean 
            console.log('PROPS DATA', mostCurrent[i].props)
            console.log('PROPS DATA TYPES', typeof mostCurrent[i].props)
            let props = mostCurrent[i].props;
            if (typeof props === "object") {
              if (props.constructor === Array) {
                for (let j = 0; j < props.length; j++) {
                  // console.log('PROPS ARRAY FOUND' + 'Data type: ' + 'Array' + '\n' + 
                  // 'Data: ' + props[j]);
                  propsData = document.createTextNode('\n' + 'PROPS ARRAY FOUND' + '\n' + 'Data type: ' + 'Array' + '\n' + 
                  j + ':' + props[j]);
                  document.getElementById(`stateCard: ${i}`).appendChild(propsData);                                     
                }
              }
              else if (props.constructor === Object) {
                  console.log('PROPS OBJECT FOUND' + 'Data type: ' + 'Object' + '\n' + 'Data: ' + props);
              }
            }
            // const propsData = document.createTextNode('Props: ' + mostCurrent[i].props + '\n');
            // document.getElementById(`stateCard: ${i}`).appendChild(propsData);
        }
          // var node = document.createElemen t("LI"); 
          // var textnode = document.createTextNode(cleanData[i]);         // Create a text node        
          // document.getElementById("stateData").appendChild(textnode);
      }
      
     // let example = 'hello';
      // var node = document.createElement('h4');
      // var textnode = document.createTextNode(example);
      // node.appendChild(textnode);
      // document.getElementById('app').appendChild(node);

   }
  })
};


function getChildren(child) {
  console.log("function run")
  let result = []
  let node = child

 if (node.name !== 'div') {
    result.push({
      name : node.name,
      props : node.props,
      state : node.state,
    })
  }
  
 for (keys in node.children) {
    result = result.concat(getChildren(node.children[keys]))
  }
  return result
}

// console.log('getChildren', getChildren());
// document.getElementById("nameData").appendChild(results);

