---
layout: default
title: Data Analysis I Notes
permalink: /machine-learning/data-analysis-i/
description: 'Collecting and preparing data with Python and Pandas'
---

<strong style="margin-top:-1rem;">Finding, cleaning, and reshaping data for analysis.</strong>

<div class='writing nu'>
  {% for post in site.categories.data-analysis-i %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
