---
layout: default
title: Distributed Systems Notes
permalink: /computer-science/distributed-systems/
description: 'Your notes on Distributed Systems'
---

<strong style="margin-top:-1rem;">
  Notes on Distributed Systems
</strong>

<div class='writing nu'>
  {% for post in site.categories.distributed-systems %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>