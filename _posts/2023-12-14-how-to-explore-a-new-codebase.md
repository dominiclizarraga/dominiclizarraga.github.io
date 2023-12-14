---
title: How to quickly deep dive into a new code base.
categories: blog
layout: post
---

1. Utilize the User interface to create domain model objects (post, books, etc), followed by monitoring the server-side Rails logs.

2. Examine the generated SQL and then directly access the database using either `psql` or the `rails dbconsole`.

3. Lastly investigate the most recent record that has been saved or added to the database.

