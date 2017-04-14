(function() {
    console.log('popup')
    const port = chrome.runtime.connect({
      name: 'popup'
    })
    let start = 0
    port.onMessage.addListener(msg => {
        const end = performance.now()
        appendLog(end - start)
    })
    document.getElementById('msg1').addEventListener('click', () => {
        start = performance.now()
        port.postMessage({ type: 'req1' });
    })
    document.getElementById('msg2').addEventListener('click', () => {
        start = performance.now()
        port.postMessage({ type: 'req2' });
    })
    const appendLog = (text) => {
        const node = document.createElement('div')
        node.appendChild(document.createTextNode(text))
        document.getElementById('log').appendChild(node)
    }
})();
