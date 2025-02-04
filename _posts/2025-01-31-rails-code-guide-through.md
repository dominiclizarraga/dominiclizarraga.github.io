---
title: Rails code guide through with Kasper Timm Hansen | notes
categories: blog
layout: post
---
Next session with Kasper [(luma link)](https://lu.ma/8a8clh9b){:target="_blank"}

Last Friday I attended a session with [Kasper](@kaspth.bsky.social) where he shared with us how he usually explores Rails codebase, he’s got a lot of experience doing this therefore I applied what I learned here. 

1. [Setting up the app](#setting-up)
2. [Possible error with bundle](#bundle-error)
3. [First exploration with ActiveRecord lib](#active-record)
4. [`super` keyword for `.valid?`](#super-valid)
5. [`super` keyword for `.save`](#super-save)
6. [Ruby call stack](#inheritance)
7. [Recap with flow chart](#recap)

Always have a question in mind that you want to answer otherwise it may be pretty easy to get lost.💡

### Setting up the app {#setting-up}
```ruby
# create a new rails app
rails new callbacks && cd callbacks
# create a new model
rails g model Post title
rails db:migrate
# add the following code to the model
class Post < ApplicationRecord
  validates :title, presence: true, allow_nil: false

  before_validation :titleize_title
  after_create :print_out_title

  private
    def titleize_title
      return unless title.present?
      self.title = title.downcase.titleize
      puts "before_validation- Title changed to #{title}"
    end

    def print_out_title
      puts "after_create- Title was saved as: #{title}"
    end
end
```

After setting up a very basic app with 2 callbacks, and one validation, we can see that both callbacks are running corrrectly.

```ruby
➜  callbacks git:(main) ✗ rc
Loading development environment (Rails 8.0.1)
callbacks(dev)> p = Post.new
=> #<Post:0x00000001205322c8 id: nil, title: nil, created_at: nil, updated_at: nil>
callbacks(dev)> p.valid?
=> false
callbacks(dev)> p.errors.full_messages
=> ["Title can't be blank"]
callbacks(dev)> p.title = "HOLA"
=> "HOLA"
callbacks(dev)> p.save
before_validation- Title changed to Hola 👈
  TRANSACTION (0.1ms)  BEGIN immediate TRANSACTION /*application='Callbacks'*/
  Post Create (10.0ms)  INSERT INTO "posts" ("title", "created_at", "updated_at") VALUES ('Hola', '2025-02-03 01:09:45.881379', '2025-02-03 01:09:45.881379') RETURNING "id" /*application='Callbacks'*/
after_create- Title was saved as: Hola 👈
  TRANSACTION (0.3ms)  COMMIT TRANSACTION /*application='Callbacks'*/
=> true
```

Pretty standard, now what does trigger ‘active_record_callbacks’? Was it after calling “.valid?” or “.save”? 

### Possible error with bundle {#bundle-error}

Let’s go and open active_record library with '`bundle open activerecord`', it might throw you an error, I fixed it in VScode by adding:

```shell
# in your console
code ~/.zshrc
# add the next code to your ‘.zshrc’ file
export EDITOR="code --wait"
# close it and run
source ~/.zshrc
```

[Docs for 'bundle open'](https://bundler.io/man/bundle-open.1.html) 🪄

### First exploration with ActiveRecord lib {#active-record}

Within [lib/active_record/validations.rb:69](https://github.com/rails/rails/blob/main/activerecord/lib/active_record/validations.rb#L69){:target="_blank"} and after reading a bit we can see the following chain of method calls: 

<p align="center"><strong>save → perform_validations → valid?.</strong></p>

Let’s add a puts statement and test it out.

```ruby
def valid?(context = nil)
  puts "you are calling 'valid?' :)" # added for testing 👈
  context ||= default_validation_context
  output = super(context) # <--- calls ActiveModel::Validations#valid? (parent method)
  errors.empty? && output
end
```

Close the editor and '`reload!`' rails console

```ruby
➜  callbacks git:(main) reload!
Loading development environment (Rails 8.0.1)
callbacks(dev)> p = Post.new
=> #<Post:0x0000000120b394c8 id: nil, title: nil, created_at: nil, updated_at: nil>
callbacks(dev)> p.valid?
you are calling 'valid?' :) 👈
=> false
callbacks(dev)> p.title = "HOLA!"
=> "HOLA!"
callbacks(dev)> p.save
you are calling 'valid?' :) 👈
before_validation- Title changed to Hola!
  TRANSACTION (0.1ms)  BEGIN immediate TRANSACTION /*application='Callbacks'*/
  Post Create (3.0ms)  INSERT INTO "posts" ("title", "created_at", "updated_at") VALUES ('Hola!', '2025-02-03 01:32:16.234929', '2025-02-03 01:32:16.234929') RETURNING "id" /*application='Callbacks'*/
after_create- Title was saved as: Hola!
  TRANSACTION (0.5ms)  COMMIT TRANSACTION /*application='Callbacks'*/
=> true
```

We can conclude with this inspection that each time we call “.save” or “save!” we call in the end “.valid?”.

Now, let’s explore the 2 ‘super’ keywords following the chain of methods up to its ancestor.

### '`super`' keyword for `.valid?` {#super-valid}

Let’s open the gem with '`bundle open activemodel`'.

‘.valid?’ will invoke ActiveModel::Validations#valid? [lib/active_model/validations.rb:361](https://github.com/rails/rails/blob/main/activemodel/lib/active_model/validations.rb#L361){:target="_blank"} this method will call ‘run_validations!’ which is defined in [lib/active_model/validations.rb:459](https://github.com/rails/rails/blob/main/activemodel/lib/active_model/validations.rb#L459)


```ruby
def valid?(context = nil)
  current_context = validation_context
  context_for_validation.context = context
  errors.clear
  run_validations! # <--- calls all validation callbacks (returns true if the record is valid, false otherwise)
ensure
  context_for_validation.context = current_context
end
```
<p align="center"><strong>run_validations! → _run_validate_callbacks</strong></p>


The latter comes from ActiveSupport::Callbacks, it is dynamically generated via ['define_callbacks',](https://github.com/rails/rails/blob/main/activesupport/lib/active_support/callbacks.rb#L901){:target="_blank"} inside of this ActiveSupport module you'll find very interesting classes as Before, After, Around, CallbackSequence, CallbackChain (where the callbacks are stored.)

### '`super`' keyword for `.save` {#super-save}

The second 'super' keyword is in ‘.save’ and goes up to ActiveRecord::Persistence module.

Just for making this more practical I have added a puts statement to [lib/active_record/persistence.rb:390](https://github.com/rails/rails/blob/main/activerecord/lib/active_record/persistence.rb#L390){:target="_blank"}

```ruby
def save(**options, &block)
  create_or_update(**options, &block)
  puts "you saved it :)" # added for testing 👈
rescue ActiveRecord::RecordInvalid
  false
end
```

rails console 🎮

```ruby
callbacks(dev)> p = Post.new
=> #<Post:0x000000011d5b92a8 id: nil, title: nil, created_at: nil, updated_at: nil>
callbacks(dev)> p.title = "HOLA?"
=> "HOLA?"
callbacks(dev)> p.valid?
you are calling 'valid?' :)
before_validation- Title changed to Hola?
=> true
callbacks(dev)> p.save
you are calling 'valid?' :)
before_validation- Title changed to Hola?
  TRANSACTION (0.1ms)  BEGIN immediate TRANSACTION /*application='Callbacks'*/
  Post Create (8.7ms)  INSERT INTO "posts" ("title", "created_at", "updated_at") VALUES ('Hola?', '2025-02-03 23:16:20.758330', '2025-02-03 23:16:20.758330') RETURNING "id" /*application='Callbacks'*/
after_create- Title was saved as: Hola?
you saved it :) 👈
  TRANSACTION (0.0ms)  ROLLBACK TRANSACTION /*application='Callbacks'*/
=> nil
``` 
'.save' will call ['create_or_update'](https://github.com/rails/rails/blob/main/activerecord/lib/active_record/persistence.rb#L899){:target="_blank"} and then depending on whether the object is new or not, it can be about an 'insert' or 'update' operation.

### How ruby call up its ancestor objects {#inheritance}

Something that was difficult to wrap my head around was why ‘valid?’ and ‘save’ point to different modules and how they get overridden? After some lookups I figured that this is because in 'lib/active_record/base.rb' we have the following:

Since Validations is included after Persistence, it overrides 'save', adding validation checks before calling 'super' to go back to 'Persistence#save'.

```ruby
Module ActiveRecord
 class Base
   include Persistence 
   include Validations
   include Callbacks
   ...
 end
end
```
Also within lib/active_record/callbacks.rb we see that ActiveModel::Callbacks is included.

```ruby
module ActiveRecord
  module Callbacks
    module ClassMethods
      include ActiveModel::Callbacks
    end
    included do
      include ActiveModel::Validations::Callbacks

      define_model_callbacks :initialize, :find, :touch, only: :after
      define_model_callbacks :save, :create, :update, :destroy
    end
  end
end
```



<!-- For the method ‘.save’, ‘super’ calls the next method in the method lookup chain, which will be [ActiveRecord::Persistence#save:390](https://github.com/rails/rails/blob/main/activerecord/lib/active_record/persistence.rb#L390){:target="_blank"} which in turn will determine if it’s a new_object call create or update alternatively -->

<!-- lib/active_model/validations/callbacks.rb -->



<!-- ```ruby 
module Callbacks
  extend ActiveSupport::Concern

  included do
    include ActiveSupport::Callbacks
    define_callbacks :validation,
                      skip_after_callbacks_if_terminated: true,
                      scope: [:kind, :name]
  end
```
 -->

### Recap with visual aid {#recap}

When we call '.save', Ruby follows this lookup order:

First, it checks the model's own class (Post in your case).

Your Post model does not define save, so Ruby looks in the included modules.
Second, it checks ActiveRecord::Validations#save.

Since this method exists, it runs, calling perform_validations.
If validation passes, it calls super, which means “find the next save method in the lookup chain.”
Third, super calls ActiveRecord::Persistence#save.

This method handles inserting/updating the record.


Here a flow chart as recap of what we explored




