import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const {JSDOM}=await import(process.env.JSDOM_MODULE || 'jsdom');
const html=readFileSync(new URL('../tools/ocr.html',import.meta.url),'utf8');
function setup(){
 const dom=new JSDOM(html,{url:'https://example.test/tools/ocr.html',runScripts:'outside-only'});
 const w=dom.window;w.Ptk={t:key=>'translation:'+key};
 w.URL.createObjectURL=file=>{assert.ok(file instanceof w.File);return 'blob:https://example.test/generated-opaque-id';};
 w.eval([...w.document.scripts].at(-1).textContent);
 return dom;
}
test('OCR file names and bytes never become markup or a caller-controlled URL',()=>{
 const dom=setup(),w=dom.window;
 const file=new w.File(['<svg onload="window.pwned=1"></svg>'],'<img src=x onerror="window.pwned=1">.svg',{type:'image/svg+xml'});
 w.handleFile(file);
 assert.equal(w.document.querySelector('#preview').src,'blob:https://example.test/generated-opaque-id');
 assert.equal(w.document.querySelectorAll('svg').length,0);
 assert.equal(w.pwned,undefined);dom.window.close();
});
test('OCR progress and failure text retain HTML metacharacters as text',()=>{
 const dom=setup(),w=dom.window,payload='<img src=x onerror="window.pwned=1">\nOCR progress';
 w.setRawStatus(payload);const status=w.document.querySelector('#status');
 assert.equal(status.textContent,payload);assert.equal(status.children.length,0);
 w.setStatus('ocr.ocrFailed','warn',' '+payload);
 assert.equal(status.textContent,'translation:ocr.ocrFailed '+payload);
 assert.equal(status.children.length,0);assert.equal(w.pwned,undefined);dom.window.close();
});
