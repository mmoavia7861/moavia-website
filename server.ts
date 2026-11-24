import express from 'express';
import { createServer as createViteServer } from 'vite';

/**
 * Local development/preview entrypoint only. Public tools, legacy Gemini
 * endpoints and the old fake lead-received stub have been retired.
 * Production uses Cloudflare Worker + Firestore directly.
 */
const app=express();
app.disable('x-powered-by');

function gone(_req:express.Request,res:express.Response) {
  res.setHeader('X-Robots-Tag','noindex, nofollow');
  res.setHeader('Cache-Control','no-store');
  res.status(410).type('text/plain').send('This tool has been permanently removed from moaviaseo.com.');
}
app.use('/tools',gone);
app.use('/api',gone);

async function startServer() {
  const dev=process.env.NODE_ENV!=='production';
  if(dev){
    const vite=await createViteServer({server:{middlewareMode:true},appType:'spa'});
    app.use(vite.middlewares);
  }else{
    app.use(express.static('dist'));
    app.get('*',(_req,res)=>res.sendFile('dist/index.html',{root:'.'}));
  }
  const port=Number(process.env.PORT)||3000;
  app.listen(port,'0.0.0.0',()=>console.log('Moavia portfolio preview at http://0.0.0.0:'+port));
}
void startServer();
