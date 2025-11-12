function getData(endpoint){
    return fetch(endpoint);
}

getData('db.json')
    .then((dataset) => dataset.json())
    .then((dataArr) => dataArr);


