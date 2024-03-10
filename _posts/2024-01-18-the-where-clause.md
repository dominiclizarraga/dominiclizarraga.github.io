---
title: Avoiding N+1 Queries 🚓
categories: blog
layout: post
---

When optimizing an app, I recently learned to pay attention to the `.where` or `.find` methods inside `.each` loops because they can be potential candidates for association preloading.

The reason is that for each element we iterate over, another operation will be executed, in this case `.where` or `.find`, which can lead to an N+1 query problem.

Let's see how it works.

```ruby
# Controller action
def index
  @posts = Post.all
end

# View template
<% @posts.each do |post| %>
  <h2><%= post.title %></h2>
  # This will trigger separate query for each post to fetch the author
  <p>Author: <%= post.author.name %></p>
  # This will trigger separate query for each post to fetch the comments
  <p>Comments: <%= post.comments.count %></p>
<% end %>
```
SQL produced:

```sql
-- 1 for Post.all
SELECT "posts".* FROM "posts"
-- 2 for each post's author and comments count, this can get really worse
SELECT "authors".* FROM "authors" WHERE "authors"."id" = ? LIMIT 1  [["id", 1]]
SELECT COUNT(*) FROM "comments" WHERE "comments"."post_id" = ?  [["post_id", 1]]
```

To avoid this we can use `.includes`

```ruby
# Controller action
def index
  # we eagerly load the author and comments for all the posts in a single query
  @posts = Post.includes(:author, :comments).all
end

# View template
<% @posts.each do |post| %>
  <h2><%= post.title %></h2>
  <p>Author: <%= post.author.name %></p>
  <p>Comments: <%= post.comments.count %></p>
<% end %>
```
SQL produced:

```sql
-- 1 for Post.includes(:author, :comments), which eagerly loads the associated author and comments
-- The number of queries is reduced to 3 (1 for posts, 1 for authors, 1 for comments), regardless of the number of posts.
SELECT "posts".* FROM "posts"
SELECT "authors".* FROM "authors" WHERE "authors"."id" IN (1, 2, 3)
SELECT "comments".* FROM "comments" WHERE "comments"."post_id" IN (1, 2, 3)
```

Another alternative is to use `.eager_load` instead of `.includes`. The difference is that `.includes` uses separate queries to load the associations, while `.eager_load `uses a single query with a LEFT_OUTER_JOIN.

[Here I have a deeper blog about it!](/2023/12/06/n-+-1-queries.html)

Just wanted to highlight that you must be careful of those `where`, `find` and `find_by` inside of loops!