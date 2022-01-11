const fs = require('fs');

fs.writeFileSync('hello.txt', 'Hello from Node.js');

const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!');
        }, 1500);
    })
    // setTimeout(() => {
    //     callback('Done!');
    // }, 1500);
    return promise //runs right away, but code doesn't execute until function called
}

setTimeout(() => {
    console.log('Timer is done!');
    // fetchData(text => { //executes once timer is done in the fetchdata function, text is the callback passed in
    //     console.log(text);
    // })
    fetchData().then(text => {
        console.log(text);
        return fetchData();
    })
    .then(text2 => {
        console.log(text2);
    });
}, 2000);