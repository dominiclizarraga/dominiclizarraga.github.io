---
layout: default
title: Decision Science Notes
permalink: /machine-learning/decision-science/
description: 'Statistics, regression, and data-driven decision making'
---

<strong style="margin-top:-1rem;">Using statistics to turn a dataset into a defensible recommendation.</strong>

<div class='writing nu'>
  {% for post in site.categories.decision-science %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
