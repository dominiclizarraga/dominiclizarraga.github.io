---
title: How to quickly deep dive into a new code base.
categories: blog
layout: post
---

1. Utilize the user interface (UI) to create domain model objects (Posts, Books, Reservations, etc), followed by monitoring the server-side Rails logs.

2. Examine the generated SQL and then directly access the database using either `psql` or the `rails dbconsole`.

3. Read the Models file (book.rb), search for associations, callbacks, scopes.

4. Lastly look up the most recent record that has been saved or added to the database `rails c` and play with it.


