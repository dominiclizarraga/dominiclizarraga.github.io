---
layout: default
title: Computer Systems Notes
permalink: /computer_science/systems/
description: 'Your notes on Computer Systems'
---

<strong style="margin-top:-1rem;">
  Notes on Computer Systems
</strong>

<div class='writing nu'>
  {% for post in site.categories.systems %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>