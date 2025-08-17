---
layout: default
title: Algorithms and Data Structures Notes
permalink: /computer-science/algorithms-and-data-structures/
description: 'Your notes on Algorithms and Data Structures'
---

<strong style="margin-top:-1rem;">
  Notes on Programming: Algorithms and Data Structures
</strong>

<div class='writing nu'>
  {% for post in site.categories.algorithms-and-data-structures %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>