---
layout: default
title: Computer Systems Notes
permalink: /computer_science/relational-databases/
description: 'Your notes on Relational Databases'
---

<strong style="margin-top:-1rem;">
  Notes on Relational Databases
</strong>

<div class='writing nu'>
  {% for post in site.categories.relational-databases %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>