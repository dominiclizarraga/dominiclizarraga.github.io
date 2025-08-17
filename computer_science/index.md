---
layout: default
title: Computer Science Notes
permalink: /computer_science/
description: 'My collection of Computer Science Notes'
---

<strong style="margin-top:-1rem;">
  I've committed to gaining depth in computer science, and here are the notes I'm taking along with the lessons on
  <a href="https://csprimer.com/" target="_blank">csprimer.com</a>.
</strong>

### Courses

- [Programming: Beyond the basics](/computer_science/beyond-the-basics/)
- [Computer Systems](/computer_science/systems/)
- [Algorithms and Data Structures](/computer_science/algorithms-and-data-structures/)
- [Computer Networks](/computer_science/computer-networks/)
- [Databases](/computer_science/database/)

--------------

<div class='writing nu'>
  {% for post in site.categories.computer_science %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>