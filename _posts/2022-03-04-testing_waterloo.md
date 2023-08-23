---
title: Rails Testing | University of Waterloo
categories: blog
layout: post
---

*This is a series of lectures about rails testing -Databases & Software Engineering course.*

<div><img src='/../graphics/projects/test_pyramid.png' alt='beginning_rails' style="width:300px;"/></div>

How to test?

Mike Cohn in his book Succeeding with agile.

You should spend most of your time in Unit.

End to end is manual and it means a person goes through all the user flow to reach a user acceptance criteria, click buttons, links, add stuff to the shopping cart, make a payment.

This can be Manual test, actually using the interface, this is what the customer will see/use.

Template:
Given: that I'm a logged in user in "home page"
When: when I click on "log out"
Then: I'm logged out

Only the basics here, for example: I can create an account but don't extensively, send an email, one happy path and one sad path. 

In Rails End to end tests are called system tests

Integration, tests multiple components but exclude user interface.

In Rails it tests the controller. what does it respond? what does it send?

POST to this path with this params (we can see if a form is going to the right path)

Unit, it isolates one single object or method from the rest of the system and test it by itself. This help us see where the problem is.

Models, and classes we create, 

First I need to make sure my individual pieces work, then i put them together and see if that larger system works and eventually we're going to check out and test the whole entire system. 

[Testing Pyramid and Rails Video Lecture](https://www.youtube.com/watch?v=gVKQilNUjtA&t=10s)


MSCI 245 : Testing


Is my app free of bugs?
Does the program work as specified? Write a specification or a test that specifies expected behavior.

Test case: average_rating

Arrange - what is the input?
Act - run the program
Assert - check the output against the expected output

Then we need 2 cases:
1. For a Book with 1 or more rating, it should return the average of  that book's ratings
	1. known gotchas: integers vs float division, off by one (when you skip 1st element of the loop).
2. For a Book with 0 rating, it should return nil

This is the arrange
Bob rated 5
Sue rated -2
Ali rated 4
total 7

Run the program 
total 7 / 3 = 2.333

Assert
total vs expected_value

https://www.youtube.com/watch?v=2yYSR6ftxUo

Testing fundamentals - equivalence classes


You cannot test all inputs. You need to carefully pick inputs to find your mistakes.

"... testing can be used very effectively to show the presence of bugs, but never to show their absence" E.W. Dijkstra

if 2 inputs produce the same output, they are said to be member of the same equivalence class.

if the net method is tested correctly,  the behavior of the method should be the same, there are only 2 inputs that we must use: [1, 2, 3] and [0, -12]
```ruby
def absolute_value(x)
	if x <= 0
		return -1 * x
	else
		return x
	end
end
```

Interior & boundary values.

Values that sit on either side of a division between equivalence classes are boundary valuer -> where bugs hide.

Other values are the interior values.
```ruby
[minimum... -1]|[0 ... maximum] 
the boundary is between -1 and 0
```

Test cases: (try to put all below in just one test)

<div><img src='/../graphics/projects/testing_water.png' alt='beginning_rails' style="width:500px;"/></div>




Equivalence test case

min(a, b)

Test:
1. a == b
2. a < b
3. a > b
https://www.youtube.com/watch?v=-1kCdERz1sM

Base, Edge, and Corner Cases; Happy and Sad Paths


Base case - normal expected inputs
Edge case - inputs approach limits or outside limits
Corner case - crazy values, should never see in real world

Example: user interface - e commerce - shopping cart

Base -> user adds a few items
Edge -> user surprises us with a large order 100-1000 things
Corner -> whole store in cart (we don't want the whole site to fail, we should put a limit)

We can think of a form for creating a user name, nick names, emails, domains, capitalization

Success & failure (code should handle both)

Test both good input (success).

Test bad inputs (failure) to test proper error handling.

Black box, you test the software and don't get a look at the code, you cannot call the code

White box, you test the software and get a look at the code to see what is happening 

https://www.youtube.com/watch?v=NoP3am8ipYw 

Hunting for bugs


Logic errors
- boundaries
- common inputs to test
	- some minimum
	- zero
	- one
	- empty - zero | length | list | empty
	- negative numbers
	- first/last element of an array

Most common working with arrays or any sort of list:
- skip first/last element
- don't process last element

Numerical erros
- accidental truncation of floating point to integer
- divide by zero (think of a way how a user can input a 0 as denominator and catch the error)
- bad floating behavior (try to add a lot of small numbers to a larger numbers) 
- assume the sum of the computer is correct
- sqrt(2) != √2

Integrating boundaries
- one system talking to another
- misunderstandings about proper inputs/outputs

Other
- null values -nil
- handling of exceptions
- loss of networks/disk/power?

https://www.youtube.com/watch?v=crFl2K1bOhI

MSCI 245 : A quick intro to Minitest and automated testing


- testing framework
- enabled by default in Rails
- automated testing at 3 levels
	- Unit (individual methods or objects, this part works correctly)
	- Controller (integration) (we reproduce a browser with http verbs POST, GET)
	- System - end to end (E2E) user interface (manual, buttons)

To do unit testing we make a class that inherits from ActiveSupport::TestCase.
We make one test case for every class we want to unit test.

	test/models/book_test.rb
	
```ruby
Arrange
Act
Assert
```

```ruby

require 'test_helper' # brings test/test_helper.rb

class BookTest < ActiveSupport::TestCase
	# (always start with "test_")

	# The DB within test is empty
	def test_average_rating_multiple_ratings
		# you have to build up the case in the database
		card = Author.create!(name: "Orson Scott Card") arrange
		ender_game = Book.create!(title: "Ender's Game", year: "1985", author: card arrange
		...
		... add ratings/ users
		
		assert_in_delta(2.333, ender_game.average_rating, 0.001, "should return 2.333 for Ender's Game")
	end

	def  test_average_rating_no_ratings
		christie = Author.create!(name: "Agatha Christie")
		fire_pigs = Book.create!(title: "Fire Pigs", year: "1942", author: christie)
		
		# first the expected, then the actual
		assert_nil(fire_pigs.average_nil, "this should be nil")
	end
```

Things to note:

- File that start with "test_" are run with "rails test"
- You can create other methods
- You have access to all Rails
- You can use debugger
- Each test should be independent of other tests
- You can define a setup method in the beginning and call it before every method, (to create data)

https://www.youtube.com/watch?v=JYbHurKGzM0



Testing - Test Cases - Minitest - Capybara


```ruby
Arrange  - setup the input code
Act  - execute the code w/ input
Assert - check the result against our expected output 
```

Example: we are testing addition, the  input is 1 and 2, the expected result is 3.

E2E or systems tests:

Arrange    - sometimes could be add items to DB
Act - visit the home page, click a link to create account
Assert - did i end up in the home page?

seeds.rb is not for tests, is for using the app, like: admin.

FIRST properties of good tests

Fast - run fast
I - independent | isolated, a test should not depend on another test that has run before it; what went wrong and where (try one idea per test)
R - repeatable, every time you run a test it behaves the same
S - self validating,  tests reports pass or fail by automatic 
T - timely | thorough, write the test when your write the code; coverage

Test Frameworks - Minitest (will help us write FIRST tests)

1. resetting the Rails app and DB after each test  (repeatable, independent)
2. run tests in randomly order (independent)
3. provide assert statements & reports of pass and fail (self validating)

Fast is mainly a property of this type of test, low overhead (faster than Rspec)
Timely & Through this is about developer behavior and skills

Basics of Minitest

1. You write classes that inherit from Minitest.
2. Each method of the class that star with "test_" is run as independent test .
3. You can write a "setup" method, it will run before every test within that class (for creating user for instance).
4. Rails and Minitest restore state after each test, includes the DB.
5. Everything in Minitest in plain Ruby (only new methods like assert) (not like Rspec or cucumber).
6. Your class can have non-test  methods.
7. You have access to all Rails, models methods and so on.
8. Separate test DB to avoid contamination.
9. There are a lots of ways to assert.

assert(test = must be a boolean, message to display) - > assert(expected == results)

assert_equal(expected, actual)

assert_nil(nil)

flunk (msg) make the test fail in purpose

skip (msg)

Capybara |

url = root_path
visit url 
------
assert_current_path url
-----
click_link('id-of-link') # id's from HTML
click_link('Books')
click_button('Submit') # it's better to click on id
fill_in('Name', with: 'Bob')
-------
assert page.has_content?('Sorry Invalid.')

You can search element on the page and interact with them or inspect them
page.find(:css, 'a[href='sign_up_path']').click

assert_text ('Create an account.')

=> all about UI. If you wont access session & other "lower stuff" then write an integration.

Example:
```ruby
class LinkTest < ApplicationSystemTestCase
	def test_nav_root_to_create_account
		visit root_path
		click_link('Create Account')
		assert_current_path sign_up_path
	end
end
```

https://www.youtube.com/watch?v=DxIoWJKYxIg&t=1278s


Demo of TDD




```ruby
Arrange
Act
Assert

class StatFunction
	def self.median(values)
		if values.nil? || values.length == 0 
			raise ArgumentError("it needs at least one element")
		end
		
		if values.length == 1
			return values[0]
		end
		
		values = values.sort
		if values.length.even?
			left_of_mid = (values.length / 2) - 1
			result = ( values[left_of_mid]  + values[left_of_mid] + 1 )  /  2.0
			return result
		else
			mid  = (values.length / 2 )
			return values[mid]
		end
	end
end
```

Test

```ruby
def test_median_one_element
	# arrange
	elements = [1]
	# act
	result = TestingExample::StatFunction.median( elements)
	# assert
	assert_equal( 1, result)
end

def test_median_two_elements
	elements = [1, 2]
	result = TestingExample::StatFunction.median( elements)
	assert_in_delta( 1.5, result)
end

def test_median_three_elements
	elements = [1, 2, 3]
	result = TestingExample::StatFunction.median( elements)
	assert_equal(2
end

def test_median_zero_elements
	elements = []
	assert_raises(ArgumentError) do
		result = TestingExample::StatFunction.median( elements)
	end
end

def test_median_zero_elements
	elements = []
	assert_raises(ArgumentError) do
		result = TestingExample::StatFunction.median( elements)
	end
end

def test_median_nil
	elements = nil
	assert_raises(ArgumentError) do
		result = TestingExample::StatFunction.median( elements)
	end
end
```






https://www.youtube.com/watch?v=sOT2FgD22VI



What is Minitest?


https://semaphoreci.com/community/tutorials/getting-started-with-minitest

How to Test Rails Models with Minitest


https://semaphoreci.com/community/tutorials/how-to-test-rails-models-with-minitest


Getting Started With Testing In Rails (Using Minitest and RSpec)


https://medium.com/@ethanryan/getting-started-with-testing-in-rails-using-minitest-and-rspec-113fe1f866a


Getting Started With System Tests in Rails With Minitest


In Rails jargon, system testing refers to "testing an application as a whole system". That is done by using a browser in the tests. Instead of testing separate parts, with system tests, we can test a whole 'workflow', just like what a user goes through while interacting with our app, including the JavaScript parts. In practice, it means that we don't want a system test to check if a record is created in the database when a user clicks a button; we just test if that new record appears on their screen. These kinds of user interaction tests are also called feature tests or acceptance tests. They are different from integration tests: integration tests are for testing the behavior, especially of all the parts of the app together, but not via the user interface.

https://blog.appsignal.com/2020/02/12/getting-started-with-system-tests-in-ruby-with-minitest.html

Official Docs

https://guides.rubyonrails.org/testing.html#rails-meets-minitest


Minitest vs. RSpec in Rails


https://www.honeybadger.io/blog/minitest-rspec-rails/