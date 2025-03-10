---
layout: default
title: Networking Notes
permalink: /computer_science/networking/
description: 'Your notes on Networking'
---

<strong style="margin-top:-1rem;">
  Notes on Networking
</strong>

<div class='writing nu'>
  {% for post in site.categories.networking %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>