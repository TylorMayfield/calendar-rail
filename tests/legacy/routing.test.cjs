const {test}=require('node:test');
const assert=require('node:assert/strict');
const {accountFromLabels:parse,destination}=require('../legacy/routing.js');
test('active account is chosen by identity, never a numeric slot',()=>{
 for(const email of ['alice@example.test','bob@work.example','name+calendar@example.test']){
  assert.equal(parse([`Google Account: Person (${email})`]),email);
  assert.equal(new URL(destination(email)).searchParams.get('authuser'),email);
  assert.equal(new URL(destination(email)).pathname,'/calendar/');
 }
});
test('account switching recalculates destination without persistence',()=>{
 assert.notEqual(destination(parse(['Google Account: A (a@example.test)'])),destination(parse(['Google Account: B (b@example.test)'])));
});
test('unknown, hidden, localized or ambiguous identity never defaults to account zero',()=>{
 for(const labels of [[],[''],['Person'],['Account 2'],['Google Account: A (a@example.test) and (b@example.test)'],['A (a@example.test)','B (b@example.test)']]){
  assert.equal(parse(labels),null);
  const u=new URL(destination(parse(labels)));
  assert.equal(u.origin,'https://accounts.google.com');
  assert.equal(u.pathname,'/AccountChooser');
  assert.equal(u.searchParams.get('continue'),'https://calendar.google.com/calendar/');
 }
 assert.equal(parse(['Compte Google : Alice (alice@example.test)']),'alice@example.test');
});
test('addresses are encoded as data, never interpreted as URL structure',()=>{
 const email='a+tag&next=evil@example.test'; const u=new URL(destination(email));
 assert.equal(u.origin,'https://calendar.google.com');assert.equal(u.searchParams.get('authuser'),email);assert.equal([...u.searchParams].length,1);
});
