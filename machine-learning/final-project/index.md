---
layout: default
title: Final Project Notes
permalink: /machine-learning/final-project/
description: 'Planning, building, and presenting a data science project'
---

<strong style="margin-top:-1rem;">Using the full stack of the bootcamp to build and present a data product.</strong>

<div class='writing nu'>
  {% for post in site.categories.final-project %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
