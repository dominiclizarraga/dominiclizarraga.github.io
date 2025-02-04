---
title: Key concepts for Redis and cache 💽
categories: blog
layout: post
---

Expire

Bust

Cache hit

Cache miss

`user.touch`

Setting up redis in production since developers want a slower app in development

rails dev:cache

type of redies: volatile (cache data that can be retrieve at some point again) or non-volatile (sidekiq because it cannot be recreated since we loose the jobs that are queued)