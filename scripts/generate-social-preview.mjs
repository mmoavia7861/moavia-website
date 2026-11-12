import {deflateSync} from 'node:zlib';
import {mkdirSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
const W=1200,H=630,b=Buffer.alloc(W*H*4);
const C={bg:[248,250,255],navy:[24,36,58],blue:[74,91,205],green:[20,175,151],light:[231,236,253],white:[255,255,255]};
function box(x1,y1,x2,y2,c){for(let y=Math.max(0,y1|0);y<Math.min(H,y2);y++)for(let x=Math.max(0,x1|0);x<Math.min(W,x2);x++){let k=(y*W+x)*4;b[k]=c[0];b[k+1]=c[1];b[k+2]=c[2];b[k+3]=255;}}
function rr(x1,y1,x2,y2,r,c){for(let y=y1;y<y2;y++)for(let x=x1;x<x2;x++){const cx=Math.max(x1+r,Math.min(x,x2-r)),cy=Math.max(y1+r,Math.min(y,y2-r));if((x-cx)**2+(y-cy)**2<=r*r)box(x,y,x+1,y+1,c);}}
const glyphs={
A:'01110/10001/10001/11111/10001/10001/10001',B:'11110/10001/10001/11110/10001/10001/11110',
C:'01111/10000/10000/10000/10000/10000/01111',D:'11110/10001/10001/10001/10001/10001/11110',
E:'11111/10000/10000/11110/10000/10000/11111',F:'11111/10000/10000/11110/10000/10000/10000',
H:'10001/10001/10001/11111/10001/10001/10001',I:'11111/00100/00100/00100/00100/00100/11111',
J:'00111/00010/00010/00010/10010/10010/01100',L:'10000/10000/10000/10000/10000/10000/11111',
M:'10001/11011/10101/10101/10001/10001/10001',N:'10001/11001/10101/10011/10001/10001/10001',
O:'01110/10001/10001/10001/10001/10001/01110',P:'11110/10001/10001/11110/10000/10000/10000',
Q:'01110/10001/10001/10001/10101/10010/01101',R:'11110/10001/10001/11110/10100/10010/10001',
S:'01111/10000/10000/01110/00001/00001/11110',T:'11111/00100/00100/00100/00100/00100/00100',
U:'10001/10001/10001/10001/10001/10001/01110',V:'10001/10001/10001/10001/10001/01010/00100',
W:'10001/10001/10001/10101/10101/10101/01010',
'&':'01100/10010/10100/01000/10101/10010/01101','.':'00000/00000/00000/00000/00000/01100/01100',
'/':'00001/00001/00010/00100/01000/10000/10000','<':'00001/00010/00100/01000/00100/00010/00001',
'>':'10000/01000/00100/00010/00100/01000/10000','{':'00011/00100/00100/01000/00100/00100/00011',
'}':'11000/00100/00100/00010/00100/00100/11000',
' ':'00000/00000/00000/00000/00000/00000/00000'};
function txt(t,x,y,k,c){for(const a of t.toUpperCase()){const g=(glyphs[a]||glyphs[' ']).split('/');for(let j=0;j<7;j++)for(let i=0;i<5;i++)if(g[j][i]==='1')box(x+i*k,y+j*k,x+(i+1)*k,y+(j+1)*k,c);x+=6*k;}}
box(0,0,W,H,C.bg);rr(63,100,315,141,18,C.light);txt('PERSONAL PORTFOLIO',82,111,3,C.blue);
txt('MOAVIA HASSAN',61,210,8,C.navy);rr(61,332,709,414,22,C.blue);
txt('SEO TOOLS & WEB PROJECTS',87,355,4,C.white);box(65,450,194,461,C.green);box(194,450,255,461,C.blue);
txt('MOAVIASEO.COM',69,499,5,C.navy);txt('FREE TOOLS / REAL PROJECTS',69,569,3,C.blue);
rr(769,121,1151,515,36,C.navy);rr(782,181,1138,501,25,C.white);rr(782,181,1138,224,14,C.navy);
for(let x=806;x<874;x+=26)rr(x,193,x+13,206,6,C.green);rr(810,259,1099,335,13,C.light);txt('</>',855,274,7,C.blue);
rr(809,362,905,454,16,C.blue);rr(927,362,1023,454,16,C.green);txt('Q',838,383,7,C.white);txt('{}',935,386,5,C.white);
box(0,608,W,H,C.navy);box(0,600,426,609,C.green);
function crc(a){let n=~0;for(const v of a){n^=v;for(let j=0;j<8;j++)n=(n>>>1)^((n&1)?0xedb88320:0)}return(~n)>>>0;}
function ch(t,x){const z=Buffer.from(t),l=Buffer.alloc(4),c=Buffer.alloc(4);l.writeUInt32BE(x.length);c.writeUInt32BE(crc(Buffer.concat([z,x])));return Buffer.concat([l,z,x,c]);}
const raw=Buffer.alloc((W*4+1)*H);for(let y=0;y<H;y++)b.copy(raw,y*(W*4+1)+1,y*W*4,(y+1)*W*4);
const hdr=Buffer.alloc(13);hdr.writeUInt32BE(W,0);hdr.writeUInt32BE(H,4);hdr[8]=8;hdr[9]=6;
const png=Buffer.concat([Buffer.from('89504e470d0a1a0a','hex'),ch('IHDR',hdr),ch('IDAT',deflateSync(raw,{level:9})),ch('IEND',Buffer.alloc(0))]);
mkdirSync(join(process.cwd(),'public'),{recursive:true});writeFileSync(join(process.cwd(),'public/social-preview.png'),png);
console.log('Created 1200x630 social-preview.png ('+png.length+' bytes).');
