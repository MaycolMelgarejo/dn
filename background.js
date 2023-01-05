let interval = null;

function startUpdating() {
  interval = setInterval(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
  }, 5000);
}

function stopUpdating() {
  clearInterval(interval);
  interval = null;
}

chrome.pageAction.onClicked.addListener(function () {
  if (interval) {
    stopUpdating();
  } else {
    startUpdating();
  }
});

chrome.contextMenus.create({
  id: "start",
  title: "Start",
  contexts: ["page_action"],
  onclick: startUpdating
});

chrome.contextMenus.create({
  id: "stop",
  title: "Stop",
  contexts: ["page_action"],
  onclick: stopUpdating
});



