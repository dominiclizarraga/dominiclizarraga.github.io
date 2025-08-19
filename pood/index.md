---
layout: default
title: Practical Object-Oriented Design
permalink: /pood/
description: 'My journey through POOD course - sessions, lessons, and insights'
---

<strong style="margin-top:-1rem;">
  Documenting my journey through
  <a href="https://courses.sandimetz.com/" target="_blank">Practical Object-Oriented Design course</a>.
</strong>

--------------

<div class='writing nu'>
  {% for post in site.categories.pood %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>