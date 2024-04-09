const app = require('./app');

async function main() {
    await app.listen(3000);
    console.log('Me ejecuto en http://localhost:3000');
}

main();