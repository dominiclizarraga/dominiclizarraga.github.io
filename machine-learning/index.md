---
layout: default
title: Machine Learning Learning Log
permalink: /machine-learning/
description: 'My notes from the Le Wagon Machine Learning & AI bootcamp'
---

<strong style="margin-top:-1rem;">
  Notes, exercises, and projects from my Machine Learning &amp; AI bootcamp journey.
</strong>

### Topics

- [Data Science Foundations](/machine-learning/data-science-foundations/)
- [Data Analysis I — collecting and preparing data](/machine-learning/data-analysis-i/)
- [Data Analysis II — querying and visualising data](/machine-learning/data-analysis-ii/)
- [Decision Science](/machine-learning/decision-science/)
- [Machine Learning Foundations](/machine-learning/machine-learning-foundations/)
- [Applied Machine Learning](/machine-learning/applied-machine-learning/)
- [Deep Learning](/machine-learning/deep-learning/)
- [Generative AI and Transformers](/machine-learning/generative-ai-and-transformers/)
- [Machine Learning Engineering (MLOps)](/machine-learning/mlops/)
- [Final Project](/machine-learning/final-project/)

--------------

<div class='writing nu'>
  {% for post in site.categories.machine-learning %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
