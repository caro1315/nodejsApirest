const express = require('express');
const routerApi = require('./routes');
const { logErrors, logHandler, boomErrorHandler } = require('./middlewares/error.hander');
const cors = require('cors')
const faker = require('faker');

const app = express();
const port = process.env.PORT || 3000;



app.use(express.json());
const whileList = ['http://127.0.0.1:5500', 'http://myapp.co'];
const options = {
    origin: (origin, callback) => {
        if (whileList.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido'));
        }
    }
}
app.use(cors(options)); // Si lo dejamos asi, se le da accesos a todos.

app.get('/', (req, res) => {
    res.send('Hello Luis');
});

app.get('/nueva-ruta', (req, res) => {
    res.send('Hello Luis Jose Briceño');
});

routerApi(app);

app.use(logErrors); //El orden se realiza secuencial
app.use(boomErrorHandler);
app.use(logHandler);






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
