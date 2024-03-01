---
title: Follow as Polymorphic
categories: blog
layout: post
---

In this blog post I'll share my findings when developing a Follow model (User can follow another User, Post, Comapny) with a polymorphic property.

```ruby
class User < ApplicationRecord
  # Users that follow this user 'Followers'
  has_many :followers, class_name: 'Follow', as: :followable

  # Entities this user follows 'Following'
  has_many :following, class_name: 'Follow', foreign_key: 'user_id'
end

class Follow < ApplicationRecord
  belongs_to :user # who is making/pushing the button "Follow" (doing the following)
  belongs_to :followable, polymorphic: true

  validates :user_id, uniqueness: { scope: [:followable_type, :followable_id] }
end
```
```ruby

rails console ⌨️

u1 = User.first
u2 = User.last

follow = u1.following.create(followable: u2)

Follow Create (3.8ms)  INSERT INTO "follows" ("user_id", "followable_type", "followable_id", "created_at", "updated_at") 
VALUES ($1, $2, $3, $4, $5) RETURNING "id"  [["user_id", 1], ["followable_type", "User"], ["followable_id", 18], 
["created_at", "2024-02-29 05:25:28.228037"], ["updated_at", "2024-02-29 05:25:28.228037"]]
  TRANSACTION (0.6ms)  COMMIT
=> #<Follow:0x0000000102d226e0
 id: 6,
 user_id: 1,
 followable_type: "User",
 followable_id: 18,
 created_at: Thu, 29 Feb 2024 05:25:28.228037000 UTC +00:00,
 updated_at: Thu, 29 Feb 2024 05:25:28.228037000 UTC +00:00>

Follow.count
=> 1

u1.following.create(followable: u2)
=> TRANSACTION (0.8ms)  ROLLBACK (due to model validation)

u1.follows? u2
=> true

u2.followers
=> [#<Follow:0x000000012eb126d0
  id: 6,
  user_id: 1,
  followable_type: "User",
  followable_id: 18,
  created_at: Thu, 29 Feb 2024 05:12:17.215129000 UTC +00:00,
  updated_at: Thu, 29 Feb 2024 05:12:17.215129000 UTC +00:00>]

u1.following
[#<Follow:0x0000000102b63fc0
  id: 6,
  user_id: 1,
  followable_type: "User",
  followable_id: 18,
  created_at: Thu, 29 Feb 2024 05:12:17.215129000 UTC +00:00,
  updated_at: Thu, 29 Feb 2024 05:12:17.215129000 UTC +00:00>,
 #<Follow:0x0000000102d226e0
 ...]
```

And it workd for other models like (Post, Company, etc)

```ruby
class Post < ApplicationRecord
  has_many :followers, class_name: 'Follow', as: :followable
end
user = User.find(user_id)
post = Post.find(post_id)

user.following.create(followable: post)
  TRANSACTION (0.6ms)  COMMIT
=> 
#<Follow:0x0000000150038080
 id: 8,
 user_id: 1,
 followable_type: "Post",
 followable_id: 92,
 created_at: Thu, 29 Feb 2024 05:56:29.921783000 UTC +00:00,
 updated_at: Thu, 29 Feb 2024 05:56:29.921783000 UTC +00:00>

```
We've explored creating a follower system in Rails, showcasing the flexibility of polymorphic associations and the importance of validations. This guide provides a solid foundation for adding social functionalities to your Rails applications, ensuring a robust and scalable feature set.