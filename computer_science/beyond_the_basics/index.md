---
layout: default
title: Computer Systems Notes
permalink: /computer_science/beyond-the-basics/
description: 'Your notes on beyond programming'
---

<strong style="margin-top:-1rem;">
  Notes on Programming: Beyond the Basics
</strong>

<div class='writing nu'>
  {% for post in site.categories.beyond-the-basics %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>