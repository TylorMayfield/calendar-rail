const fs=require('node:fs'),path=require('node:path');const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const guard="if (location.origin !== 'https://mail.google.com' || !location.pathname.startsWith('/mail/')) return;";
const raw=read('extension/content.js');if(!raw.includes(guard))throw Error('Review fixture origin guard.');
const adapter=raw.replace(guard,"if (location.protocol !== 'file:') return;");
let html=read('tests/browser/index.html').replace('<link rel="stylesheet" href="/fixture.css">','<style>'+read('tests/browser/fixture.css')+'</style>');
for(const [url,file]of [['/guards.js','tests/browser/guards.js'],['/routing.js','extension/routing.js'],['/harness.js','tests/browser/harness.js']])html=html.replace(`<script src="${url}"></script>`,'<script>'+read(file)+'</script>');
html=html.replace('<script src="/test-content.js"></script>','<script>'+adapter+'</script><script type="text/plain" id="adapter-copy">'+adapter+'</script>');
fs.mkdirSync(path.join(root,'build'),{recursive:true});fs.writeFileSync(path.join(root,'build/browser-harness.html'),html);console.log(path.join(root,'build/browser-harness.html'));
