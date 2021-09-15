/* global __dirname */

let express = require('express');

let { join } = require('path');

let app = express();

app.disable('x-powered-by');

app.use('/media', express.static(join(__dirname, 'public', 'media')));

function onSendFileError(req, res) {
    return (error) => {
        if (error) {
            if (error.code === 'ECONNABORTED' || error.syscall === 'write') {
                return;
            }
            if (error.status == 404) {
                return res.sendStatus(404);
            }
        }
    };
}

const faviconSrc = join(__dirname, 'public', 'media', 'favicon.ico');
app.get('/favicon.ico', (req, res) => res.sendFile(faviconSrc));

app.get('/fonts/:name', (req, res) => res.sendFile(join(__dirname, 'public', 'fonts', req.params.name), onSendFileError(req, res)));

/**
 * 
 * @param {string} type 
 * @returns 
 */
function send(type) {
    const src = join(__dirname, 'public', type);
    return (req, res) => {
        /**
         * @type {string}
         */
        const url = req.url.slice(type.length - 1);
        const name = url.length < 1 ? 'index.' + type : url.concat('.', type);
        return res.sendFile(join(src, name), (req, res));
    };
}

app.use('/css', send('css'));
app.use('/js', send('js'));

app.use(send('html'));

const port = 80;
app.listen(port, () => console.log('Server listening '.concat(port, ' port')));