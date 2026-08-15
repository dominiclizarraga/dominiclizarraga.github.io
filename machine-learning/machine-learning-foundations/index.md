---
layout: default
title: Machine Learning Foundations Notes
permalink: /machine-learning/machine-learning-foundations/
description: 'Data preparation, features, and supervised machine learning'
---

<strong style="margin-top:-1rem;">The end-to-end machine-learning workflow, from prepared data to evaluated models.</strong>

<div class='writing nu'>
  {% for post in site.categories.machine-learning-foundations %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
