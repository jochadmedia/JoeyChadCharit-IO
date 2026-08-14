import { createServer } from 'http';
import { defaultHandler } from 'next/dist/server/base-final.js';

createServer((req, res) => {
    defaultHandler(req, res);
}).listen();