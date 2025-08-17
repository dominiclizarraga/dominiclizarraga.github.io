---
layout: default
title: Computer Science Notes
permalink: /computer-science/
description: 'My collection of Computer Science Notes'
---

<strong style="margin-top:-1rem;">
  I've committed to gaining depth in computer science, and here are the notes I'm taking along with the lessons on
  <a href="https://csprimer.com/" target="_blank">csprimer.com</a>.
</strong>

### Courses

- [Programming: Beyond the basics](/computer-science/beyond-the-basics/)
- [Computer Systems](/computer-science/systems/)
- [Algorithms and Data Structures](/computer-science/algorithms-and-data-structures/)
- [Computer Networks](/computer-science/computer-networks/)
- [Operating Systems](/computer-science/operating-systems/)
- [Relational Databases](/computer-science/relational-databases/)
- [Distributed Systems](/computer-science/distributed-systems/)

--------------

<div class='writing nu'>
  {% for post in site.categories.computer-science %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>