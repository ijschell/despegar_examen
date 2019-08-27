export const deliveries = fetch('https://raw.githubusercontent.com/ijschell/despegar_db/master/db.json').then(data => {    
    return data.json();
}).then(data => {
    return data;
})

export default deliveries;