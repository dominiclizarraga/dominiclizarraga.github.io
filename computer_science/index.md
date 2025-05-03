---
layout: default
title: Computer Science Notes
permalink: /computer_science/
description: 'Your collection of Computer Science Notes'
---

<strong style="margin-top:-1rem;">
  I've committed to gaining depth in computer science, and here are the notes I'm taking along with the lessons on csprimer.com.
</strong>

## Categories

- [Programming: Beyond the basics](/computer_science/beyond/)
- [Computer Systems](/computer_science/systems/)
- [Networking](/computer_science/networking/)
- [Databases](/computer_science/database/)

--------------

<div class='writing nu'>
  {% for post in site.categories.computer_science %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>