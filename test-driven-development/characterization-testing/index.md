---
layout: default
title: Characterization Testing Notes
permalink: /test-driven-development/characterization-testing/
description: 'Safely changing legacy code by first capturing its current behavior'
---

<strong style="margin-top:-1rem;">Protecting existing behavior before changing code that has little or no test coverage.</strong>

<div class='writing nu'>
  {% for post in site.categories.characterization-testing %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
