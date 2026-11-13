const fs=require('node:fs'); const path=require('node:path'); const cp=require('node:child_process');
require('./audit.cjs');
const root=path.resolve(__dirname,'..'); const version=JSON.parse(fs.readFileSync(path.join(root,'extension/manifest.json'))).version;
fs.mkdirSync(path.join(root,'dist'),{recursive:true});
const target=path.join(root,'dist',`calendar-rail-${version}.zip`);
fs.rmSync(target,{force:true});
cp.execFileSync('/usr/bin/zip',['-qr',target,'manifest.json',...JSON.parse(fs.readFileSync(path.join(root,'extension/manifest.json'))).content_scripts[0].js,'about.html','about.css','icons'],{cwd:path.join(root,'extension')});
console.log(target);
// App Store Connect requires the Safari manifest name to match its app record.
// Executable files remain byte-for-byte identical to the Chrome package.
const safari=path.join(root,'build/safari-extension');
fs.rmSync(safari,{recursive:true,force:true});
fs.mkdirSync(safari,{recursive:true});
for(const f of ['manifest.json',...JSON.parse(fs.readFileSync(path.join(root,'extension/manifest.json'))).content_scripts[0].js,'about.html','about.css','icons'])fs.cpSync(path.join(root,'extension',f),path.join(safari,f),{recursive:true});
const manifest=JSON.parse(fs.readFileSync(path.join(safari,'manifest.json')));
manifest.name='Calendar Rail';
manifest.icons['512']='icons/icon-512.png';
manifest.icons['1024']='icons/icon-1024.png';
fs.copyFileSync(path.join(root,'assets/icon-1024.png'),path.join(safari,'icons/icon-1024.png'));
fs.writeFileSync(path.join(safari,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
const safariTarget=path.join(root,'dist',`calendar-rail-safari-${version}.zip`);
fs.rmSync(safariTarget,{force:true});
cp.execFileSync('/usr/bin/zip',['-qr',safariTarget,...fs.readdirSync(safari)],{cwd:safari});
console.log(safariTarget);
