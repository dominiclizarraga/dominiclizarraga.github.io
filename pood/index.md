---
layout: default
title: Practical Object-Oriented Design
permalink: /pood/
description: 'My journey through POOD course - sessions, lessons, and insights'
---

<strong style="margin-top:-1rem;">
  Documenting my journey through
  <a href="https://courses.sandimetz.com/" target="_blank">Practical Object-Oriented Design course</a>.
</strong>

Good OO requires an understanding of three things:

<ul>
  <li>
    First, <b>testing</b>. You have to know how to write good tests.
  </li>
  <li>
    Second, <b>refactoring</b>. You need the skills to rearrange the shape of existing code without breaking it
  </li>
  <li>
    Finally, <b>OO</b>. You have to understand the concepts underlying object-oriented programming and design.
  </li>
</ul>

--------------

<div class='writing nu'>
  {% for post in site.categories.pood %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>