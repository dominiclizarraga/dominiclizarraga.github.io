---
layout: default
title: Test Doubles Notes
permalink: /test-driven-development/test-doubles/
description: 'Using test doubles to isolate unpredictable or slow dependencies'
---

<strong style="margin-top:-1rem;">Keeping tests fast and deterministic by controlling external collaborators.</strong>

<div class='writing nu'>
  {% for post in site.categories.test-doubles %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
