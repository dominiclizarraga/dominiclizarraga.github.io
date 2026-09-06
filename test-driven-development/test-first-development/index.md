---
layout: default
title: Microtests and Test-First Development Notes
permalink: /test-driven-development/test-first-development/
description: 'Writing concise, expressive, repeatable tests before production code'
---

<strong style="margin-top:-1rem;">Using small tests to guide one behavior and one design decision at a time.</strong>

<div class='writing nu'>
  {% for post in site.categories.test-first-development %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
