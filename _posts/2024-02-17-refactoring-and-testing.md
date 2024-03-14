---
title: Refactoring and testing a long method in Ruby on Rails
categories: blog
layout: post
---

Recently, we had the opportunity to refactor a lengthy method in a Ruby on Rails project. The method had multiple conditional statements (around 6) that checked various aspects of a project, such as whether it was discarded, on time, accepting entries, and more. Refactoring this method required careful planning and testing to ensure that the functionality remained intact while improving the code's maintainability and readability.

Before diving into the refactoring process, we first focused on writing tests that covered all the edge and corner cases. To do this, we wrote tests that checked the opposite of what the method was currently doing. For each conditional statement, we created a test that verified the expected behavior when the condition was met and when it was not.

Here's an example of how we tested a condition that checked if a project was able to receive entries using FactoryBot:

```ruby
# In the test file
describe 'Project entries' do
  it 'should not accept entries when the project is not set to receive entries' do
    project = FactoryBot.create(:project, receive_entries: false)
    # Assert that the project does not accept entries
    expect(project.accept_entries?).to be_falsey
  end

  it 'should accept entries when the project is set to receive entries' do
    project = FactoryBot.create(:project, receive_entries: true)
    # Assert that the project accepts entries
    expect(project.accept_entries?).to be_truthy
  end
end
```

By writing tests for both scenarios (project accepting entries and not accepting entries), we ensured that the refactored method would handle these cases correctly.

Once we had a comprehensive test suite in place and all the tests were passing, we started the refactoring process. It's important to remember that refactoring aims to modify the internal structure of the code without changing its external behavior. The goal is to improve performance, maintainability, and readability while adhering to the DRY (Don't Repeat Yourself) principle.

During the refactoring, we focused on breaking down the long method into smaller, more manageable chunks. we extracted common functionality into separate methods and aimed to reduce the complexity of the conditional statements. Here's a simplified example of how the refactored method might look:

```ruby
def process_project(project)
  return if project.discarded?
  return unless project.on_time?
  return unless project.accept_entries?

  # Process the project
  # ...
end
```
By separating the conditions into individual guard clauses, the method becomes more readable and easier to understand.

Throughout the refactoring process, we continuously ran the tests to ensure that the functionality remained intact and that we didn't introduce any unintended changes.

Refactoring a long method can be a challenging task, especially for beginners. However, by following a systematic approach of writing comprehensive tests, breaking down the method into smaller parts, and focusing on improving maintainability and readability, you can successfully refactor your code and make it more manageable for future changes.

Remember 🎗️, refactoring is an iterative process, and it's okay to take small steps and gradually improve your code over time. By consistently applying good coding practices and seeking feedback from more experienced developers, you can continuously enhance your refactoring skills and write cleaner, more maintainable code.

- Breaking down the method into smaller, more manageable pieces.
- Applying the DRY (Don't Repeat Yourself) principle to eliminate redundancy.
- Enhancing performance and maintainability to ensure the code could be easily modified in the future.
