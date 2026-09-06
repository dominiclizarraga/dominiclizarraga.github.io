---
layout: default
title: Test-Driven Development Learning Log
permalink: /test-driven-development/
description: 'Preparation, exercises, and notes from the Essential Test-Driven Development workshop'
---

<strong style="margin-top:-1rem;">
  Preparation, exercises, and lessons from my
  <a href="https://www.agileinstitute.com/essential-test-driven-development" rel="noopener noreferrer" target="_blank">Essential Test-Driven Development workshop</a>.
</strong>

### Topics

- [TDD Foundations](/test-driven-development/foundations/)
- [Microtests and Test-First Development](/test-driven-development/test-first-development/)
- [Test Doubles](/test-driven-development/test-doubles/)
- [Characterization Testing for Legacy Code](/test-driven-development/characterization-testing/)
- [Refactoring with Tests](/test-driven-development/refactoring/)
- [Team TDD Practice](/test-driven-development/team-practice/)

--------------

<div class='writing nu'>
  {% for post in site.categories.test-driven-development %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
