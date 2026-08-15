---
layout: default
title: Data Science Foundations Notes
permalink: /machine-learning/data-science-foundations/
description: 'Python and SQL foundations for the Data Science & AI bootcamp'
---

<strong style="margin-top:-1rem;">Python, SQL, and the habits that make a solid data-science foundation.</strong>

<div class='writing nu'>
  {% for post in site.categories.data-science-foundations %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
