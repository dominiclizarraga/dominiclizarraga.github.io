---
layout: default
title: Team TDD Practice Notes
permalink: /test-driven-development/team-practice/
description: 'Collaborative habits for establishing a sustainable TDD practice'
---

<strong style="margin-top:-1rem;">Turning individual TDD skills into a diligent, sustainable team habit.</strong>

<div class='writing nu'>
  {% for post in site.categories.team-tdd-practice %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
