/* Pure routing helpers, shared unchanged by Chrome and Safari. */
((root) => {
  'use strict';
  function accountFromLabels(labels) {
    if (labels.length !== 1) return null;
    const matches = [...labels[0].matchAll(/\(([^\s()<>]+@[^\s()<>]+\.[^\s()<>]+)\)/g)];
    return matches.length === 1 ? matches[0][1] : null;
  }
  function destination(email) {
    if (!email) return 'https://accounts.google.com/AccountChooser?continue=' + encodeURIComponent('https://calendar.google.com/calendar/');
    const url = new URL('https://calendar.google.com/calendar/');
    url.searchParams.set('authuser', email);
    return url.href;
  }
  const api = Object.freeze({accountFromLabels,destination});
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CalendarRailRouting = api;
})(globalThis);
