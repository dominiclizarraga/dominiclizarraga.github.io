---
layout: default
title: Machine Learning Engineering (MLOps) Notes
permalink: /machine-learning/mlops/
description: 'Training, deploying, and monitoring production machine-learning models'
---

<strong style="margin-top:-1rem;">Taking a model from a notebook to a reliable, observable product.</strong>

<div class='writing nu'>
  {% for post in site.categories.mlops %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
