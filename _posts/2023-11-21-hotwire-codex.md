---
title: The Rails and Hotwire Codex 🌀
categories: blog
layout: post
---
## Notes

Turbo Native is the core of Hotwire’s native extensions. It orchestrates a **native web view** through **multiple screens** within native navigation. This way the app has a native feel, despite all the content being rendered using the same HTML views as the web app.

### Native navigation

*Navigation in a Turbo Native app is completely native.* When the user taps a link, a native method is called to handle the visit proposal. If a fully native screen is preferred for a given URL, this method is where that choice can be made.

More commonly, we’ll want to visit the destination URL. 1) When a link is tapped, 2) Turbo Native creates a new screen, 3) injects the web view into it, 4) drives the web view to the new location using Turbo, and 5) displays the screen to the user.

###  Authentication

Turbo Native apps use **cookie based authentication** for requests originating in a web view. If you have purely native screens and need to make HTTP requests from native code, you’ll need to implement a form of token based authentication on the server.

### Session

A session co-ordinates **a single native web view.** It’s responsible for triggering URL visits using Turbo, and for inserting the web view into new screens when displayed to the user, we’ll use a different session for each tab so the navigation in each tab is totally independent.

### Path Configuration

The path configuration is a JSON file stored in the app bundle.

This file specifies a set of rules that match URLs, using regex patterns, to a set of properties. These properties define how a URL should be displayed in the app. If a particular URL has a fully native screen, this is where we tell Turbo Native about that.

Feature flags and other settings can also be defined making it simple to turn features on and off remotely.







All of this content was taken from book below, they're personal notes. I encourage you buy it.

[Book link is here.](https://railsandhotwirecodex.com/)