---
layout: default
title: Computer Systems Notes
permalink: /computer_science/database/
description: 'Your notes on databases'
---

<strong style="margin-top:-1rem;">
  Notes on Databases
</strong>

<div class='writing nu'>
  {% for post in site.categories.database %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>