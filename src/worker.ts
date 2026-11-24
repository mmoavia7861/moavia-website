import { handleCmsRequest, publicSiteJson } from './cmsWorker';

/**
 * moaviaseo.com is now a portfolio, project and service website.
 * All legacy SEO/AI tools and their public POST APIs are permanently retired.
 * Keep the published-only CMS, contact pages and public site settings working.
 */
interface WorkerEnv {
  ASSETS: { fetch(request: Request): Promise<Response> };
}
const securityHeaders:Record<string,string> = {
  'Cache-Control':'no-store',
  'X-Content-Type-Options':'nosniff',
  'Referrer-Policy':'no-referrer',
  'Strict-Transport-Security':'max-age=31536000',
  'X-Frame-Options':'DENY',
  'Content-Security-Policy':"default-src 'none'; frame-ancestors 'none'",
};

function retired():Response {
  return new Response('This tool is permanently removed from moaviaseo.com.',{
    status:410,headers:{
      ...securityHeaders,
      'Content-Type':'text/plain; charset=utf-8',
      'X-Robots-Tag':'noindex, nofollow',
    }
  });
}

export default {
  async fetch(request:Request,env:WorkerEnv):Promise<Response> {
    const url=new URL(request.url);
    // Return 410 for legacy URLs even if cached/build artifacts still exist.
    if(url.pathname==='/tools' || url.pathname.startsWith('/tools/')) return retired();
    if(url.pathname==='/api/public-site' && request.method==='GET') return publicSiteJson();
    if(url.pathname==='/api/health' && request.method==='GET') {
      return new Response(JSON.stringify({ok:true,backend:'Cloudflare Worker',mode:'portfolio'}),{
        headers:{...securityHeaders,'Content-Type':'application/json; charset=utf-8'}
      });
    }
    if(url.pathname.startsWith('/api/'))return retired();
    const published=await handleCmsRequest(request,env);
    return published ?? env.ASSETS.fetch(request);
  },
};
