// Load Libraries
loadScript("smartbrowser",start);

function loadScript(scriptName, callback) {
    var scriptEl = document.createElement('script');
    scriptEl.src = chrome.extension.getURL('lib/' + scriptName + '.js');
    scriptEl.addEventListener('load',callback,false);
    document.head.appendChild(scriptEl);
}

function start(){
	var s = new SmartBrowser();
	chrome.omnibox.onInputEntered.addListener(s.parseURLInput.bind(s));
}
