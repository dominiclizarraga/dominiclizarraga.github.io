---
layout: default
title: Applied Machine Learning Notes
permalink: /machine-learning/applied-machine-learning/
description: 'Unsupervised learning, time series, text, and image models'
---

<strong style="margin-top:-1rem;">Applying machine learning to structured and unstructured data.</strong>

<div class='writing nu'>
  {% for post in site.categories.applied-machine-learning %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
