let storage = {};

chrome.devtools.panels.create(
  'React-Scope-Test', // title of the panel
  null, // the path to the icon
  'devtools.html', // html page for injecting into the tab's content
  sendMessage // callback function optional
);

const cache = new StateCache();
let cleanData = []; // clean data
let prevData = []; // previous state data
let prevNode; // track of previous state
let reactData; // current state data

function sendMessage() {
  console.log('React-Scope-Test Console');
  let port = chrome.runtime.connect({
    name: 'ilhfmcnjanhibheilakfaahiehikcmgf',
  });
  port.postMessage({
    name: 'connect',
    tabId: chrome.devtools.inspectedWindow.tabId,
  });
  port.onMessage.addListener((msg) => {
    // console.log(msg, "msg data")
    if (!msg.data) {
      console.log(msg);
      console.log('There is no data');
    } else {
      cache.addToHead(msg);
      console.log(cache, 'cache data');
      reactData = cache.head.value.data.currentState[1].children[3];
      prevNode = cache.head.prev;
      // .value.data.currentState[1].children[3];
      cleanData = getChildren(reactData);
      console.log(cleanData, 'result');
    }
  });
}

function retrieveState(string) {
  switch (string) {
    case 'current':
      console.log(cleanData, 'current');
      prevNode = cache.head.prev;
      break;
    case 'previous':
      if (prevNode.prev) {
        prevNode = prevNode.prev;
        prevData = getChildren(prevNode.value.data.currentState[1].children[3]);
        console.log(prevData, 'previous Data');
      } else console.log('no more previous state');
      break;
    case 'next':
      if (prevNode.next) {
        prevNode = prevNode.next;
        prevData = getChildren(prevNode.value.data.currentState[1].children[3]);
        console.log(prevNode, 'next data');
      } else console.log('no more next state');
      break;
    // case "next":
    //     prevData = getChildren();
    //     console.log(prevData, "initial Data")
    //     break;
    default:
      prevNode = cache.head.prev;
      console.log(cleanData, 'cleanData');
  }
}

function getChildren(child) {
  let result = [];
  let node = child;

  if (node.name !== 'div') {
    result.push({
      name: node.name,
      props: node.props,
      state: node.state,
    });
  }

  for (keys in node.children) {
    result = result.concat(getChildren(node.children[keys]));
  }
  return result;
}

// convert data to JSON for storage
function stringifyData(obj) {
  let box = [];
  const data = JSON.parse(JSON.stringify(obj, ((key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (box.indexOf(value) !== -1) {
        return;
      }
      box.push(value);
    }
    return value;
  })));
  box = null;
  return data;
}

// Here we are using a doubly linked list to store state changes
function StateCache() {
  this.head = null;
  this.tail = null;
}

function Node(val) {
  this.value = val;
  this.next = null;
  this.prev = null;
}

StateCache.prototype.addToHead = (value) => {
  const data = stringifyData(value);
  const node = new Node(data);

  if (!this.head) {
    this.head = node;
    this.tail = node;
  } else {
    node.prev = this.head;
    this.head.next = node;
    this.head = node;
  }
};
