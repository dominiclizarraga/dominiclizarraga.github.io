---
categories:
  - book
layout: book
date: 2026-09-10
title: "Natural Language Processing in Action: Understanding, analyzing, and generating text with Python"
publisher: Manning
published: "2019"
author: Hobson Lane, Cole Howard & Hannes Max Hapke
isbn13: "9781617294631"
isbn: "9781617294631"
---

Currently reading. Notes in progress.

## Notes

<!-- Start writing your notes here. -->

This book is divided in 3 parts and it assumes you already know Python. It does contain code snippets and exercises we can run in our machines.

Part I is a brief introduction to classic NLP, like doing each step at the time, going from English sentence, tokenize them, then vectorize and lastly apply topic vectors in order to compress those numerical representations. This is useful for semantic search to chatbots.

Part II starts using some Neural Networks and more modern algorithm like backpropagation and libraries like `Word2Vec` the type of NN (neural network are presented in the book are CNN and RNN).

Part III is meant for building a real project using most modern NLP.

## Chapter 1. Packets of thought (NLP overview)

In this chapter the book goes over what really is NLP, difference of "natural language" vs "programming language" and incrementally we add more tools to build our chatbot.

Natural language is used for communicate each other, it doesn't need an interpreter/compiler, it doesn't process math operations like a Programming language does. However we need to process Natural language in a way that computer can understand so that it act on those statements or even reply to them, we need to make those statements into data (numbers).

> A natural language processing system is often referred to as a
pipeline because it usually involves several stages, where input is natural languge and a processed output flows out.

> The size of the actual natural language content currently
online must exceed 100 billion gigabytes.

> Natural languages can’t be directly translated into a precise set of mathematical operations, but they do contain information and instructions that can be extracted.

The math.

>Processing natural language to extract useful information can be difficult. It requires tedious statistical bookkeeping, but that’s what machines are for.

> Once you extract structured numerical data, vectors, from natural language, you can take advantage of all the tools of mathematics and machine learning. 

> We use the same linear algebra tricks as the projection of 3D objects onto a 2D computer screen, allowing computers to interpret and store the “meaning” of statements rather than just word or character counts. Semantic analysis, along with statistics, can help resolve the ambiguity of natural language.

Here is another challenge for computer to understand Natural language and it's "decoding" which is having the current context when a phrase is said. Like when someone says: "Good morning." What makes a morining good? What about noons and afternoons?

> This degree of compression is still out of reach for machines.

Language through a computer’s “eyes”

> When you type “Good Morn’n Rosa,” a computer sees only “01000111 01101111
01101111 …”. How can you program a chatbot to respond to this binary stream
intelligently?

For some mechanical pattern matching we can use either lock language statements,
such as “01-02-03" or Regular expressions. Amazon Echo, Google Home, and similarly complex and useful assistants use this kind of language to encode the logic for most of their user interaction.

Regular expressions are indeed used mostly for search, for sequence matching. Example: `grep`

This pattern matching chatbot is an example of a tightly controlled chatbot.

The first regex recognizes simple greetings such as `hi`, `hello`, and `hey`, optionally followed by a name.

```python
import re
r = "(hi|hello|hey)[ ]*([a-z]*)"

# IGNORECASE igonores uppercase/lowercase differences
re.match(r, "Hello Rosa", flags=re.IGNORECASE)
# match='Hello Rosa'

re.match(r, "hi ho, hi ho, it's off to work ...", flags=re.IGNORECASE)
# match='hi ho'

re.match(r, "hey, what's up", flags=re.IGNORECASE)
# match='hey'
```

A version with a more flexible greeting:

```python
r = r"[^a-z]*([y]o|[h']?ello|ok|hey|(good[ ])?(morn[gin']{0,3}|"\"
re_greeting = re.compile(r, flags=re.IGNORECASE)
re_greeting.match("Hello Rosa")
re_greeting.match("Good morning Rosa")
re_greeting.match("Good Morn'n Rosa")
re_greeting.match("yo Rosa")
re_greeting.match("Good evening Rosa Parks").groups()

# ('Good evening', 'Good ', 'evening', 'Rosa')
```

A modern chatbot can learn from reading (processing) a bunch of English text. Also these two versiones don't allow typos or last name from the user since we are only pattern matching first name characters.

> Because of the limitations of computational resources, early NLP researchers had to use their human brains’ computational power to design and hand-tune complex logical rules to extract information from a natural language string. This is called a pattern based approach to NLP.

> The core NLP building blocks like stemmers and tokenizers as well as sophisticated end-to-end NLP dialog engines (chatbots) like ELIZA were built this way, from regular expressions and pattern matching

Another way.

> Is there a statistical or machine learning approach that might work in place of the pattern-based approach?

> When we use character sequence matches to measure distance between natural language phrases, we’ll often get it wrong. Phrases with similar meaning, like “good” and “okay,” can often have different character sequences and large distances when we count up character-by-character.

> And sequences with completely different meanings, like “bad” and “bar,” might be too close to one other when we use metrics designed to measure distances between numerical sequences. Metrics like Jaccard, Levenshtein, and Euclidean vector distance can sometimes add enough “fuzziness” to prevent a chatbot from stumbling over minor spelling errors or typos. But these metrics fail to capture the essence of the relationship between two strings of characters when they are dissimilar.

> Distance metrics designed for numerical sequences and vectors are useful for a few NLP applications, like spelling correctors and recognizing proper nouns. So we use these distance metrics when they make sense.

> But for NLP applications where we are more interested in the meaning of the natural language than its spelling, there are better approaches. We use vector representations of natural language words and text and some distance metrics for those vectors for these NLP applications. 

Using statistics, machine learning and more data. We nned to use vector for storing the words based on frequency and meaning, see how the "bag of words" can be represented by removing stop-words, rare-words:

![ bag-of-words vector machine](/../graphics/nlp-in-action/bag_of_words.png)

> Those bins and the numbers they contain for each word are represented as long vectors containing a lot of zeros and a few ones or twos scattered around wherever the word for that bin occurred.

```python
Sentence: "A bat and a rat"

Embedding (illustrative): [0.2323, -0.4210, 0.8732]

Word frequencies:
{
  "a": 2,
  "bat": 1,
  "and": 1,
  "rat": 1
}
```

> (many bins, one for each possible word) aren’t very useful for language processing. But they are good enough for some industry-changing tools like spam filters

> One statistical question that is asked of bag-of-words vector sequences is “What is the combination of words most likely to follow a particular bag of words?” Or, even better, if a user enters a sequence of words, “What is the closest bag of words in our database to a bag-of-words vector provided by the user?” This is a search query. 

> Theinput words are the words you might type into a search box, and the closest bag-of-words vector corresponds to the document or web page you were looking for.

A brief overflight of hyperspace.

> When we project these vectors onto each other to determine the distance
between pairs of vectors, this will be a reasonable estimate of the similarity in their meaning rather than merely their statistical word usage

> This vector distance metric is called cosine distance metric.

> We can even project (“embed” is the more precise term) these vectors in a 2D plane to have a “look” at them in plots and diagrams to see if our human brains can find patterns. 

> We can then teach a computer to recognize and act on these patterns in ways that reflect the underlying meaning of the words that produced those vectors.

Here is another aproach to represent high dimension vectors called a bit vector language model, or the sum of “one-hot encoded” vectors.

```text
Sentence: "A bat and a rat" (lowercased before counting)
Our vocabulary also includes "dog", which is absent here.

Vocabulary:       a   bat  and  rat  dog
                  ↓    ↓    ↓    ↓    ↓
One-hot vector for each word occurrence:
  "a"           [ 1,   0,   0,   0,   0 ]
  "bat"         [ 0,   1,   0,   0,   0 ]
  "and"         [ 0,   0,   1,   0,   0 ]
  "a"           [ 1,   0,   0,   0,   0 ]
  "rat"         [ 0,   0,   0,   1,   0 ]
                ─────────────────────────
Sum (counts):   [ 2,   1,   1,   1,   0 ]  → 5 dimensions
                  │
                  │ Change every positive count to 1
                  ↓
Bit vector:     [ 1,   1,   1,   1,   0 ]  → 5 dimensions
                  ↑                   ↑
               present              absent

Each bit answers: "Does this word appear in the sentence?"
Summing one-hot vectors for DISTINCT words also gives this bit vector.
We lose repetition counts, not dimensions: still one position per word
in the vocabulary.
```

- Count vectors measure occurrences. 
- Binary vectors record presence. 
- Rating vectors describe chosen properties.
- Learned embeddings encode patterns learned from data.

Word order and grammar.

When we have short sentences like "Good morning Rosa" order doesn't matter, but when dealing with longer strings, the order is key.

A chatbot natural language pipeline.

Most chatbots contain elements of these stages:

> 1 Parse—Extract features, structured numerical data, from natural language text.

> 2 Analyze—Generate and combine features by scoring text for sentiment, grammaticality, and semantics.

> 3 Generate—Compose possible responses using templates, search, or language models.

> 4 Execute—Plan statements based on conversation history and objectives, and select the next response.

![chatbot stages](/../graphics/nlp-in-action/chatbot_stages.png)

One processing element in figure 1.3 that isn’t typically employed in search, forecasting, or question answering systems is natural language generation.

Processing in depth.

## Chapter 2. Build your vocabulary (word tokenization)

> This chapter will help you split a document, any string, into discrete tokens of meaning. Dealing with nonstandard punctuation. Compressing your token vocabulary with stemming and lemmatization. Building a vector representation.

> Retrieving tokens from a document will require some string manipulation beyond just the `str.split()`.

> Once you’ve identified the tokens in a document that you’d like to include in your vocabulary, you’ll return to the regular expression toolbox to try to combine words with similar meaning in a process called stemming.

> Then you’ll assemble a vector representation of your documents called a bag of words then try to use this vector to see if it can help you improve upon the greeting recognizer

> In this chapter, we show you straightforward algorithms for separating a string into words. You’ll also extract pairs, triplets, quadruplets, and even quintuplets of tokens. These are called `n-grams`

> Using n-grams enables your machine to know about “ice cream” as well as the “ice” and “cream” that comprise it.

> In natural language processing, composing a numerical vector from text is a particularly “lossy” feature extraction process. Nonetheless the bag-of-words (BOW) vectors retain enough of the information content of the text to produce useful and interesting machine learning models.

> Feature extraction can rarely retain all the information content of the input data in any machine learning pipeline. That’s part of the art of NLP, learning when your tokenizer needs to be adjusted to extract more or different information from your text for your particular application.

> In NLP, composing a numerical vector from text is a particularly “lossy” feature extraction process. Nonetheless the bag-of-words (BOW) vectors retain enough of the information content of the text to produce useful and interesting machine learning models.

 Building your vocabulary with a tokenizer

> In NLP, tokenization is a particular kind of document segmentation. Segmentation breaks up text into smaller chunks or segments, with more focused information content. Segmentation can include breaking a document into paragraphs, paragraphs into sentences, sentences into phrases, or phrases into tokens (usually words) and punctuation

> Tokenization is the first step in an NLP pipeline, so it can have a big impact on the rest of your pipeline. A tokenizer breaks unstructured data, natural language text, into chunks of information that can be counted as discrete elements.

> `.split()` this built-in Python method already does a decent job tokenizing a simple sentence. Its only “mistake” was on the last word, where it included the sentence-ending punctuation with the token “26.”

> One hot vectors are nice representation of words and tabular representation of documents is that no information is lost. As long as you keep track of which words are indicated by which column, you can reconstruct the original document from this table of one-hot vectors.

```python
import pandas as pd

pd.DataFrame(onehot_vectors, columns=vocab)
```

```text
   26.  Jefferson  Monticello  Thomas  age  at  began  building  of  the
0    0          0           0       1    0   0      0         0   0    0
1    0          1           0       0    0   0      0         0   0    0
2    0          0           0       0    0   0      1         0   0    0
3    0          0           0       0    0   0      0         1   0    0
4    0          0           1       0    0   0      0         0   0    0
5    0          0           0       0    0   1      0         0   0    0
6    0          0           0       0    0   0      0         0   0    1
7    0          0           0       0    1   0      0         0   0    0
8    0          0           0       0    0   0      0         0   1    0
9    1          0           0       0    0   0      0         0   0    0
```

> However, mathematically is not practical. It grows pretty quickly. And what you really want to do is compress the meaning of a document down to its essence. You’d like to compress your document down to a single vector rather than a big table.

> What if you split your documents into much shorter chunks of meaning, say sentences. And what if you assumed that most of the meaning of a sentence can be gleaned from just the words themselves. Let’s assume you can ignore the order and grammar of the words, and jumble them all up together into a “bag,” one bag for each sentence or short document. That turns out to be a reasonable assumption. Even for documents several pages long, a bag-of-words vector is still useful for summarizing the essence of a document.

>  You can use this new bag-of-words vector approach to compress the information content for each document into a data structure that’s easier to work with.

> This is also called a word frequency vector, because it only counts the frequency of words, not their order.

Dot product

> The dot product is also called the inner product because the “inner” dimension of the two vectors (the number of elements in each vector) or matrices (the rows of the first matrix and the columns of the second matrix) must be the same.

> The dot product is also called the scalar product because it produces a single scalar value as its output. This helps distinguish it from the cross product, which produces a vector as its output.

```python
python = np.array([0.9, 0.1])
javascript = np.array([0.8, 0.1])
pizza = np.array([0.1, 0.9])

print(python @ javascript) # 0.73
print(python @ pizza) # 0.18

Python · JavaScript = 0.73
Python · pizza      = 0.18

# This tells us that Pythin and JS vectors are more aligned than Python and pizza.
```

Constraint: For a dot product, the inner dimensions must match. For two vectors, this simply means they must have the same length.

Measuring bag-of-words overlap

> If we can measure the bag of words overlap for two vectors, we can get a good estimate of how similar they are in the words they use. And this is a good estimate of how similar they are in meaning.

```python
a = "I like machine learning"
b = "I like deep learning"

unique_words = ["I", "like", "machine", "deep", "learning"]

A = [1, 1, 1, 0, 1]
B = [1, 1, 0, 1, 1]

A · B = 3

# because the sentences share three words: I, like, and learning.
```

> As you can imagine, tokenizers can easily become complex. In one case, you might want to split based on periods, but only if the period isn’t followed by a number, in order to avoid splitting decimals. In another case, you might not want to split after a period that is part of “smiley” emoticon symbol, such as in a Twitter message.

> The important thing is that you’ve turned a sentence of natural language words into a sequence of numbers, or vectors. Now you can have the computer read and do math on the vectors just like any other vector or list of numbers. This allows your vectors to be input into any natural language processing pipeline that requires this kind of vector

Python NLP libraries:

- spaCy—Accurate , flexible, fast, Python
- Stanford CoreNLP—More accurate, less flexible, fast, depends on Java 8
- NLTK—Standard used by many NLP contests and comparisons, popular, Python

> An even better tokenizer is the Treebank Word Tokenizer from the NLTK package. It incorporates a variety of common rules for English word tokenization. ` TreebankWordTokenizer()`

Extending your vocabulary with n-grams

> Why bother with n-grams? As you saw earlier, when a sequence of tokens is vectorized into a bag-of-words vector, it loses a lot of the meaning inherent in the order of those words. By extending your concept of a token to include multiword tokens, n-grams, your NLP pipeline can retain much of the meaning inherent in the order of words in your statements.

> For example, the meaning-inverting word “not” will remain attached to its neighboring words, where it belongs. Without n-gram tokenization, it would be free floating. Its meaning would be associated with the entire sentence or document rather than its neighboring words. The 2-gram “was not” retains much more of the meaning of the individual words “not” and “was” than those 1-grams alone in a bag-of-words vector.

> In the next chapter, we show you how to recognize which of these n-grams contain the most information relative to the others, which you can use to reduce the number of tokens (n-grams) your NLP pipeline has to keep track of. Otherwise it would have to store and maintain a list of every single word sequence it came across. This prioritization of n-grams will help it recognize “Thomas Jefferson” and “ice cream,” without paying particular attention to “Thomas Smith” or “ice shattered.”

> The later stages of your NLP pipeline will only have access to whatever tokens your tokenizer generates. So you need to let those later stages know that “Thomas” wasn’t about “Isaiah Thomas” or the “Thomas & Friends” cartoon. n-grams are one of the ways to maintain context information as data passes through your pipeline.

```python
# 1-gram VS 2-gram VS 3-gram

"""Thomas Jefferson began building Monticello at the age of 26."""

['Thomas',
'Jefferson',
'began',
'building',
'Monticello',
'at',
'the',
'age',
'of',
'26']

[('Thomas', 'Jefferson'),
('Jefferson', 'began'),
('began', 'building'),
('building', 'Monticello'),
('Monticello', 'at'),
('at', 'the'),
('the', 'age'),
('age', 'of'),
('of', '26')]

[('Thomas', 'Jefferson', 'began'),
('Jefferson', 'began', 'building'),
('began', 'building', 'Monticello'),
('building', 'Monticello', 'at'),
('Monticello', 'at', 'the'),
('at', 'the', 'age'),
('the', 'age', 'of'),
('age', 'of', '26')]
```

> If tokens or n-grams are extremely rare, they don’t carry any correlation with other words that you can use to help identify topics or themes that connect documents or classes of documents. So rare n-grams won’t be helpful for classification problems. 