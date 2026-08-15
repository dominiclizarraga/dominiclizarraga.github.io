---
layout: default
title: Deep Learning Notes
permalink: /machine-learning/deep-learning/
description: 'Neural networks for images, sequences, and text'
---

<strong style="margin-top:-1rem;">Building and training neural networks with TensorFlow and Keras.</strong>

<div class='writing nu'>
  {% for post in site.categories.deep-learning %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
