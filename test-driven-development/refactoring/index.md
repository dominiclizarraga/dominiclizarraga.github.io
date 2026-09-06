---
layout: default
title: Refactoring with Tests Notes
permalink: /test-driven-development/refactoring/
description: 'Improving maintainability and extensibility under a test safety net'
---

<strong style="margin-top:-1rem;">Improving a design in small steps while preserving observable behavior.</strong>

<div class='writing nu'>
  {% for post in site.categories.refactoring-with-tests %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
