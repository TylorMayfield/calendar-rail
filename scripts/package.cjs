const fs=require('node:fs'); const path=require('node:path'); const cp=require('node:child_process');
require('./audit.cjs');
const root=path.resolve(__dirname,'..'); const version=JSON.parse(fs.readFileSync(path.join(root,'extension/manifest.json'))).version;
fs.mkdirSync(path.join(root,'dist'),{recursive:true});
const target=path.join(root,'dist',`calendar-rail-${version}.zip`);
fs.rmSync(target,{force:true});
cp.execFileSync('/usr/bin/zip',['-qr',target,'manifest.json','content.js','routing.js','about.html','about.css','icons'],{cwd:path.join(root,'extension')});
console.log(target);
