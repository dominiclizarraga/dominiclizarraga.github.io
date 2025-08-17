---
layout: default
title: Operating Systems Notes
permalink: /computer_science/operating-systems/
description: 'Your notes on Operating Systems'
---

<strong style="margin-top:-1rem;">
  Notes on Operating Systems
</strong>

<div class='writing nu'>
  {% for post in site.categories.operating-systems %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>