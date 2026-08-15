---
layout: default
title: Data Analysis II Notes
permalink: /machine-learning/data-analysis-ii/
description: 'Querying and visualising data with SQL and Python'
---

<strong style="margin-top:-1rem;">Querying data, exploring patterns, and communicating them visually.</strong>

<div class='writing nu'>
  {% for post in site.categories.data-analysis-ii %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
