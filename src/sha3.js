/*
 A JavaScript implementation of the SHA family of hashes, as
 defined in FIPS PUB 180-4 and FIPS PUB 202, as well as the corresponding
 HMAC implementation as defined in FIPS PUB 198a

 Copyright Brian Turek 2008-2016
 Distributed under the BSD License
 See http://caligatio.github.com/jsSHA/ for more information

 Several functions taken from Paul Johnston
*/
'use strict';(function(L){function u(d,c,h){var a=0,b=[],l=0,e,m,q,g,k,f,p,r,A=!1,n=[],u=[],v,z=!1,x=!1,t=-1;h=h||{};e=h.encoding||"UTF8";v=h.numRounds||1;if(v!==parseInt(v,10)||1>v)throw Error("numRounds must a integer >= 1");if(0===d.lastIndexOf("SHA3-",0)||0===d.lastIndexOf("SHAKE",0)){var C=6;f=B;r=function(a){var b=[],e;for(e=0;5>e;e+=1)b[e]=a[e].slice();return b};t=1;if("SHA3-224"===d)k=1152,g=224;else if("SHA3-256"===d)k=1088,g=256;else if("SHA3-384"===d)k=832,g=384;else if("SHA3-512"===d)k=
576,g=512;else if("SHAKE128"===d)k=1344,g=-1,C=31,x=!0;else if("SHAKE256"===d)k=1088,g=-1,C=31,x=!0;else throw Error("Chosen SHA variant is not supported");p=function(a,b,e,g,c){e=k;var d=C,m,l=[],h=e>>>5,f=0,q=b>>>5;for(m=0;m<q&&b>=e;m+=h)g=B(a.slice(m,m+h),g),b-=e;a=a.slice(m);for(b%=e;a.length<h;)a.push(0);m=b>>>3;a[m>>2]^=d<<m%4*8;a[h-1]^=2147483648;for(g=B(a,g);32*l.length<c;){a=g[f%5][f/5|0];l.push(a.b);if(32*l.length>=c)break;l.push(a.a);f+=1;0===64*f%e&&B(null,g)}return l}}else throw Error("Chosen SHA variant is not supported");
q=D(c,e,t);m=y(d);this.setHMACKey=function(b,c,l){var h;if(!0===A)throw Error("HMAC key already set");if(!0===z)throw Error("Cannot set HMAC key after calling update");if(!0===x)throw Error("SHAKE is not supported for HMAC");e=(l||{}).encoding||"UTF8";c=D(c,e,t)(b);b=c.binLen;c=c.value;h=k>>>3;l=h/4-1;if(h<b/8){for(c=p(c,b,0,y(d),g);c.length<=l;)c.push(0);c[l]&=4294967040}else if(h>b/8){for(;c.length<=l;)c.push(0);c[l]&=4294967040}for(b=0;b<=l;b+=1)n[b]=c[b]^909522486,u[b]=c[b]^1549556828;m=f(n,m);
a=k;A=!0};this.update=function(c){var e,g,d,h=0,p=k>>>5;e=q(c,b,l);c=e.binLen;g=e.value;e=c>>>5;for(d=0;d<e;d+=p)h+k<=c&&(m=f(g.slice(d,d+p),m),h+=k);a+=h;b=g.slice(h>>>5);l=c%k;z=!0};this.getHash=function(c,e){var h,f,q,k;if(!0===A)throw Error("Cannot call getHash after setting HMAC key");q=E(e);if(!0===x){if(-1===q.shakeLen)throw Error("shakeLen must be specified in options");g=q.shakeLen}switch(c){case "HEX":h=function(a){return F(a,g,t,q)};break;case "B64":h=function(a){return G(a,g,t,q)};break;
case "BYTES":h=function(a){return H(a,g,t)};break;case "ARRAYBUFFER":try{f=new ArrayBuffer(0)}catch(M){throw Error("ARRAYBUFFER not supported by this environment");}h=function(a){return I(a,g,t)};break;default:throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER");}k=p(b.slice(),l,a,r(m),g);for(f=1;f<v;f+=1)!0===x&&0!==g%32&&(k[k.length-1]&=16777215>>>24-g%32),k=p(k,g,0,y(d),g);return h(k)};this.getHMAC=function(c,e){var h,q,n,v;if(!1===A)throw Error("Cannot call getHMAC without first setting HMAC key");
n=E(e);switch(c){case "HEX":h=function(a){return F(a,g,t,n)};break;case "B64":h=function(a){return G(a,g,t,n)};break;case "BYTES":h=function(a){return H(a,g,t)};break;case "ARRAYBUFFER":try{h=new ArrayBuffer(0)}catch(M){throw Error("ARRAYBUFFER not supported by this environment");}h=function(a){return I(a,g,t)};break;default:throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");}q=p(b.slice(),l,a,r(m),g);v=f(u,y(d));v=p(q,g,k,v,g);return h(v)}}function f(d,c){this.a=d;this.b=c}function F(d,
c,h,a){var b="";c/=8;var l,e,m;m=-1===h?3:0;for(l=0;l<c;l+=1)e=d[l>>>2]>>>8*(m+l%4*h),b+="0123456789abcdef".charAt(e>>>4&15)+"0123456789abcdef".charAt(e&15);return a.outputUpper?b.toUpperCase():b}function G(d,c,h,a){var b="",l=c/8,e,m,f,g;g=-1===h?3:0;for(e=0;e<l;e+=3)for(m=e+1<l?d[e+1>>>2]:0,f=e+2<l?d[e+2>>>2]:0,f=(d[e>>>2]>>>8*(g+e%4*h)&255)<<16|(m>>>8*(g+(e+1)%4*h)&255)<<8|f>>>8*(g+(e+2)%4*h)&255,m=0;4>m;m+=1)8*e+6*m<=c?b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(f>>>
6*(3-m)&63):b+=a.b64Pad;return b}function H(d,c,h){var a="";c/=8;var b,l,e;e=-1===h?3:0;for(b=0;b<c;b+=1)l=d[b>>>2]>>>8*(e+b%4*h)&255,a+=String.fromCharCode(l);return a}function I(d,c,h){c/=8;var a,b=new ArrayBuffer(c),l;l=-1===h?3:0;for(a=0;a<c;a+=1)b[a]=d[a>>>2]>>>8*(l+a%4*h)&255;return b}function E(d){var c={outputUpper:!1,b64Pad:"=",shakeLen:-1};d=d||{};c.outputUpper=d.outputUpper||!1;!0===d.hasOwnProperty("b64Pad")&&(c.b64Pad=d.b64Pad);if(!0===d.hasOwnProperty("shakeLen")){if(0!==d.shakeLen%
8)throw Error("shakeLen must be a multiple of 8");c.shakeLen=d.shakeLen}if("boolean"!==typeof c.outputUpper)throw Error("Invalid outputUpper formatting option");if("string"!==typeof c.b64Pad)throw Error("Invalid b64Pad formatting option");return c}function D(d,c,h){switch(c){case "UTF8":case "UTF16BE":case "UTF16LE":break;default:throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");}switch(d){case "HEX":d=function(a,b,c){var e=a.length,d,f,g,k,w,p;if(0!==e%2)throw Error("String of HEX type must be in byte increments");
b=b||[0];c=c||0;w=c>>>3;p=-1===h?3:0;for(d=0;d<e;d+=2){f=parseInt(a.substr(d,2),16);if(isNaN(f))throw Error("String of HEX type contains invalid characters");k=(d>>>1)+w;for(g=k>>>2;b.length<=g;)b.push(0);b[g]|=f<<8*(p+k%4*h)}return{value:b,binLen:4*e+c}};break;case "TEXT":d=function(a,b,d){var e,f,q=0,g,k,w,p,r,n;b=b||[0];d=d||0;w=d>>>3;if("UTF8"===c)for(n=-1===h?3:0,g=0;g<a.length;g+=1)for(e=a.charCodeAt(g),f=[],128>e?f.push(e):2048>e?(f.push(192|e>>>6),f.push(128|e&63)):55296>e||57344<=e?f.push(224|
e>>>12,128|e>>>6&63,128|e&63):(g+=1,e=65536+((e&1023)<<10|a.charCodeAt(g)&1023),f.push(240|e>>>18,128|e>>>12&63,128|e>>>6&63,128|e&63)),k=0;k<f.length;k+=1){r=q+w;for(p=r>>>2;b.length<=p;)b.push(0);b[p]|=f[k]<<8*(n+r%4*h);q+=1}else if("UTF16BE"===c||"UTF16LE"===c)for(n=-1===h?2:0,g=0;g<a.length;g+=1){e=a.charCodeAt(g);"UTF16LE"===c&&(k=e&255,e=k<<8|e>>>8);r=q+w;for(p=r>>>2;b.length<=p;)b.push(0);b[p]|=e<<8*(n+r%4*h);q+=2}return{value:b,binLen:8*q+d}};break;case "B64":d=function(a,b,c){var e=0,d,f,
g,k,n,p,r,u;if(-1===a.search(/^[a-zA-Z0-9=+\/]+$/))throw Error("Invalid character in base-64 string");f=a.indexOf("=");a=a.replace(/\=/g,"");if(-1!==f&&f<a.length)throw Error("Invalid '=' found in base-64 string");b=b||[0];c=c||0;p=c>>>3;u=-1===h?3:0;for(f=0;f<a.length;f+=4){n=a.substr(f,4);for(g=k=0;g<n.length;g+=1)d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(n[g]),k|=d<<18-6*g;for(g=0;g<n.length-1;g+=1){r=e+p;for(d=r>>>2;b.length<=d;)b.push(0);b[d]|=(k>>>16-8*g&255)<<
8*(u+r%4*h);e+=1}}return{value:b,binLen:8*e+c}};break;case "BYTES":d=function(a,b,c){var e,d,f,g,k,n;b=b||[0];c=c||0;f=c>>>3;n=-1===h?3:0;for(d=0;d<a.length;d+=1)e=a.charCodeAt(d),k=d+f,g=k>>>2,b.length<=g&&b.push(0),b[g]|=e<<8*(n+k%4*h);return{value:b,binLen:8*a.length+c}};break;case "ARRAYBUFFER":try{d=new ArrayBuffer(0)}catch(a){throw Error("ARRAYBUFFER not supported by this environment");}d=function(a,b,c){var d,f,n,g,k;b=b||[0];c=c||0;f=c>>>3;k=-1===h?3:0;for(d=0;d<a.byteLength;d+=1)g=d+f,n=
g>>>2,b.length<=n&&b.push(0),b[n]|=a[d]<<8*(k+g%4*h);return{value:b,binLen:8*a.byteLength+c}};break;default:throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");}return d}function z(d,c){return 32<c?(c-=32,new f(d.b<<c|d.a>>>32-c,d.a<<c|d.b>>>32-c)):0!==c?new f(d.a<<c|d.b>>>32-c,d.b<<c|d.a>>>32-c):d}function n(d){var c=0,h=0,a;for(a=0;a<arguments.length;a+=1)c^=arguments[a].b,h^=arguments[a].a;return new f(h,c)}function y(d){var c=[];if(0===d.lastIndexOf("SHA3-",0)||0===d.lastIndexOf("SHAKE",
0))for(d=0;5>d;d+=1)c[d]=[new f(0,0),new f(0,0),new f(0,0),new f(0,0),new f(0,0)];else throw Error("No SHA variants supported");return c}function B(d,c){var h,a,b,l,e=[],m=[];if(null!==d)for(a=0;a<d.length;a+=2)c[(a>>>1)%5][(a>>>1)/5|0]=n(c[(a>>>1)%5][(a>>>1)/5|0],new f(d[a+1],d[a]));for(h=0;24>h;h+=1){l=y("SHA3-");for(a=0;5>a;a+=1)e[a]=n(c[a][0],c[a][1],c[a][2],c[a][3],c[a][4]);for(a=0;5>a;a+=1)m[a]=n(e[(a+4)%5],z(e[(a+1)%5],1));for(a=0;5>a;a+=1)for(b=0;5>b;b+=1)c[a][b]=n(c[a][b],m[a]);for(a=0;5>
a;a+=1)for(b=0;5>b;b+=1)l[b][(2*a+3*b)%5]=z(c[a][b],J[a][b]);for(a=0;5>a;a+=1)for(b=0;5>b;b+=1)c[a][b]=n(l[a][b],new f(~l[(a+1)%5][b].a&l[(a+2)%5][b].a,~l[(a+1)%5][b].b&l[(a+2)%5][b].b));c[0][0]=n(c[0][0],K[h])}return c}var J,K;K=[new f(0,1),new f(0,32898),new f(2147483648,32906),new f(2147483648,2147516416),new f(0,32907),new f(0,2147483649),new f(2147483648,2147516545),new f(2147483648,32777),new f(0,138),new f(0,136),new f(0,2147516425),new f(0,2147483658),new f(0,2147516555),new f(2147483648,
139),new f(2147483648,32905),new f(2147483648,32771),new f(2147483648,32770),new f(2147483648,128),new f(0,32778),new f(2147483648,2147483658),new f(2147483648,2147516545),new f(2147483648,32896),new f(0,2147483649),new f(2147483648,2147516424)];J=[[0,36,3,41,18],[1,44,10,45,2],[62,6,43,15,61],[28,55,25,21,56],[27,20,39,8,14]];"function"===typeof define&&define.amd?define(function(){return u}):"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(module.exports=u),exports=u):
L.jsSHA=u})(this);
