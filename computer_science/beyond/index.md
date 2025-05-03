---
layout: default
title: Computer Systems Notes
permalink: /computer_science/beyond/
description: 'Your notes on beyond programming'
---

<strong style="margin-top:-1rem;">
  Notes on Beyond Programming
</strong>

<div class='writing nu'>
  {% for post in site.categories.beyond %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>