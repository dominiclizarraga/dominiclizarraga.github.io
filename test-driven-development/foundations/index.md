---
layout: default
title: TDD Foundations Notes
permalink: /test-driven-development/foundations/
description: 'The feedback loop, design habits, and purpose of test-driven development'
---

<strong style="margin-top:-1rem;">Building software incrementally with a fast, repeatable feedback loop.</strong>

<div class='writing nu'>
  {% for post in site.categories.tdd-foundations %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
