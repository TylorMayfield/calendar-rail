# Calendar Rail privacy policy

Effective November 13, 2026. Developer: Tylor Mayfield.

Calendar Rail adds a Calendar button to Gmail and expands Gmail’s own Calendar companion into the center workspace. It does not collect, transmit or store email or calendar content, account identities, credentials, browsing history or usage information. No analytics, tracking, advertising, backend, account connection, paid features or persistent storage.

## What the extension accesses

The code inspects the structure, dimensions and appearance of Gmail’s navigation, the selected state of its native Calendar control, and the URL and outer dimensions of its Calendar iframe. It activates that existing control and applies temporary layout styles. It does not access the iframe’s document, messages, attachments, contacts, event details or the account switcher. It does not create an account mapping or read the active email address.

The underlying Gmail and Calendar services handle authentication and load their own content. They retain their own privacy policies and network behavior. Expanding the native Calendar companion causes the same Google service to load as selecting Gmail’s existing right-side Calendar control. The extension makes no network API calls or requests to developer servers.

## Page permission

The only site scope is `https://mail.google.com/mail/*`. Your browser may warn that the extension can read and change data on mail.google.com. This access is necessary to insert the button, activate Gmail’s native control and resize its existing panel. The extension does not use that access to read email or calendar content. It requests no Calendar host access, identity, cookies, tabs, scripting, storage, webRequest or all-sites permission.

Safari asks for site access separately. Deny or revoke it in Safari Settings → Extensions, or manage Chrome site access in the extension’s Details page. Without access, the button cannot appear.

## Links, retention and removal

Source, Support and Privacy links visit GitHub only when selected. GitHub’s privacy policy applies there. Public GitHub issues are public; do not include private mail or calendar information.

There is no extension data to delete. Disable or uninstall Calendar Rail and refresh open Gmail tabs to remove its button and temporary layout changes.

Questions: https://github.com/TylorMayfield/calendar-rail/issues

This extension is an independent product and is not affiliated with, endorsed by, or sponsored by Google or any Google product.
