import SwiftUI
import SafariServices

@main
struct CalendarRailApp: App {
    var body: some Scene {
        WindowGroup("Calendar Rail") {
            VStack(alignment: .leading, spacing: 18) {
                HStack(spacing: 14) {
                    Image(systemName: "calendar").font(.system(size: 36, weight: .regular))
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Calendar Rail").font(.title.bold())
                        Text("Calendar shortcut for Gmail").foregroundStyle(.secondary)
                    }
                }
                Text("Enable Calendar Rail in Safari Settings, allow access to mail.google.com, then refresh Gmail. Show Gmail’s right side panel, then select Calendar below Meet to expand the built-in Calendar companion across the center workspace.")
                Button("Open Safari extension settings") {
                    SFSafariApplication.showPreferencesForExtension(withIdentifier: "com.tylormayfield.calendarrail.Extension") { error in
                        if error != nil {
                            DispatchQueue.main.async {
                                let alert = NSAlert()
                                alert.messageText = "Could not open Safari settings"
                                alert.informativeText = "Open Safari → Settings → Extensions and enable Calendar Rail."
                                alert.runModal()
                            }
                        }
                    }
                }.buttonStyle(.borderedProminent)
                Divider()
                Text("Page permission").font(.headline)
                Text("Safari asks to read and change data on mail.google.com. This lets the extension add the button, activate Gmail’s native Calendar control and resize its panel. It does not read messages, attachments, contacts or calendar events.")
                Text("No ads, analytics, subscriptions, backend or data storage. Gmail handles Calendar sign-in and account selection. This uses the companion’s views, not the full standalone Calendar website.")
                HStack {
                    Link("Privacy policy", destination: URL(string: "https://github.com/TylorMayfield/calendar-rail/blob/main/PRIVACY.md")!)
                    Link("Source and support", destination: URL(string: "https://github.com/TylorMayfield/calendar-rail")!)
                }
                Text("This extension is an independent product and is not affiliated with, endorsed by, or sponsored by Google or any Google product.")
                    .font(.caption).foregroundStyle(.secondary)
            }
            .padding(28).frame(width: 520).fixedSize(horizontal: true, vertical: true)
        }.windowResizability(.contentSize)
    }
}
