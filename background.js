(function() {
    console.log('background')
    const generateDummyData = () => {
        const data = {
            parts: []
        }
        for(let i = 0; i < 100; i++) {
            const part = {
                name: 'Part ' + i,
                items: []
            }
            for(let j = 0; j < 100; j++) {
                const item = {
                    title: 'Item ' + j,
                    data: []
                }
                for(let y = 0; y < 100; y++) {
                    item.data.push({
                        content: 'Message ' + y
                    })
                }
                part.items.push(item)
            }
            data.parts.push(part)
        }
        return data
    }
    // generate large data object
    const dummyData = generateDummyData()
    const getPopupMessageListener = (port) => {
        return (msg) => {
            if (msg.type === 'req1') {
                // send plain data and let API to serialize
                port.postMessage({
                    type: 'rsp1',
                    data: dummyData
                })
            }
            if (msg.type === 'req2') {
                // send serialized data
                port.postMessage({
                    type: 'rsp2',
                    data: JSON.stringify(dummyData)
                })
            }
        }
    }
    // add connection listener
    chrome.runtime.onConnect.addListener((port => {
        if (port.name === 'popup') {
            port.onMessage.addListener(getPopupMessageListener(port))
        }
    }))
})();
