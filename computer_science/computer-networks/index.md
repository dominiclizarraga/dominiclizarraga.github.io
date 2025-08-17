---
layout: default
title: Networking Notes
permalink: /computer_science/computer-networks/
description: 'Your notes on Computer Networks'
---

<strong style="margin-top:-1rem;">
  Notes on Computer Networks
</strong>

<div class='writing nu'>
  {% for post in site.categories.computer-networks %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>