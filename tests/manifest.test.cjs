const {test}=require('node:test');
test('shipping package passes privacy and permission audit',()=>require('../scripts/audit.cjs'));
