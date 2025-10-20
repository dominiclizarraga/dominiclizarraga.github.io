---
title: Mental model for writing double tests
categories: blog
layout: post
---

With my recent journey of gaining more testing experience and with chatGPT on my side, I started looking at some sort of pattern when writing the double testing exercises from the book [Efective testing with RSpec by Myron Marston and Ian Dees](/2025/04/11/effective-testing-with-rspec.html) I shared the idea with the LLM, and it helped me build the following.

First thing that poped my mind was the Arrange, Act, Assert so I did used that one to guide the LLM to what type of output I wanted.

LLM response: 

You're thinking in exactly the right direction! What you described is essentially the AAA pattern in testing: Arrange, Act, Assert.

To help you memorize and internalize it — especially when working with test doubles and APIs — here's a simple mental checklist or mantra you can use, along with a mnemonic:

🔁 The 6-Step "Double-Driven Test" Flow
🧠 Mnemonic: "DUPRAP" (like "Do a PRAP" — rhymes with “wrap”)

Double — Use test data — Program the mock — Request — Analyze (parse) — Prove (assert)

✅ 1. Double
Set up your test double (mock the collaborator)

```ruby
let(:ledger) { instance_double('ExpenseTracker::Ledger') }
```

> 💡 Think: “Who am I faking?” — usually the object under the API, like ledger.

✅ 2. Use Test Data
Define the test data your mock should return

```ruby
expenses = [
  { 'payee' => 'Zoo', 'amount' => 15.25, 'date' => '2017-06-10' },
  { 'payee' => 'Starbucks', 'amount' => 5.75, 'date' => '2017-06-10' }
]
```

> 💡 Think: “What result do I want my mock to send back?”

✅ 3. Program the Mock
Tell your double how to behave

```ruby
allow(ledger).to receive(:expenses_on)
  .with('2017-06-10')
  .and_return(expenses)
```

> 💡 Think: “When the test calls this method, return my test data.”

✅ 4. Request
Trigger the route via Rack/Test

```ruby
get '/expenses/2017-06-10'
```
> 💡 Think: “Now I run the actual API code with the test in place.”

✅ 5. Analyze
Parse the response so you can assert on it

```ruby
parsed = JSON.parse(last_response.body)
```

> 💡 Think: “What did the API give me back?”

✅ 6. Prove
Assert the expected response

```ruby
expect(parsed).to eq(expenses)
```

> 💡 Think: “Does the response match what I expected?”

🧠 Bonus: Visual Reminder
```ruby
# 1. Double
let(:ledger) { instance_double('ExpenseTracker::Ledger') }

# 2. Use Test Data
expenses = [ { 'payee' => 'Zoo', 'amount' => 15.25, 'date' => '2017-06-10' } ]

# 3. Program the Mock
allow(ledger).to receive(:expenses_on)
  .with('2017-06-10')
  .and_return(expenses)

# 4. Request
get '/expenses/2017-06-10'

# 5. Analyze
parsed = JSON.parse(last_response.body)

# 6. Prove
expect(parsed).to eq(expenses)
```
📌 Final Tip: Turn It into Muscle Memory
Every time you write a controller- or API-level test, mentally repeat:

<b>"Double, Data, Allow → Request, Parse, Expect"</b>

Write 3–5 of these for different routes, and it’ll stick — just like `git add`, `git commit`, `git push` stuck after a week or two.

Let me know if you want to turn this into a printable or flashcard!

-----

Even though tools like LLM can help us write more code (and tests!) faster than ever, understanding the basics is still on us. 

At the end of the day, we’re the ones responsible for making sure the code works and be maintainable. So the better we get at thinking through these steps, the more useful the LLM becomes.

Don’t skip the thinking.
