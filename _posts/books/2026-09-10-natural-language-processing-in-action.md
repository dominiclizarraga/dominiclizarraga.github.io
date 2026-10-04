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

> If your feature vector dimensionality exceeds the length of all your documents, your feature extraction step is counterproductive. It’ll be virtually impossible to avoid overfitting a machine learning model to your vectors; your vectors have more dimensions than there are documents in your corpus.

> Now consider the opposite problem. Consider the 2-gram “at the” in the previous phrase. That’s probably not a rare combination of words. In fact it might be so common, spread among most of your documents, that it loses its utility for discriminating between the meanings of your documents.

> For example, if a token or n-gram occurs in more than 25% of all the documents in your corpus, you usually ignore it.

> These filters are as useful for n-grams as they are for individual tokens. In fact, they’re even more useful.

Stop words.

Stop words include: a, an, the, this, and, or, of, on.

> Historically, stop words have been excluded from NLP pipelines in order to reduce the computational effort to extract information from a text. Even though the words themselves carry little information, the stop words can provide important relational information as part of an n-gram.

> Consider these two examples: Mark reported to the CEO. Suzanne reported as the CEO to the board.

> If you remove the stop words from the 4-grams, both examples would be reduced to "reported CEO", and you would lack the information about the professional hierarchy.

> Unfortunately, retaining the stop words within your pipeline creates another problem: it increases the length of the n-grams required to make use of these connections formed by the otherwise meaningless stop words. This issue forces us to retain at least 4-grams if you want to avoid the ambiguity of the human resources example.

> A typical stop word list has only 100 or so frequent and unimportant words listed in it.

> For 100,000-D bag-ofwords vectors, you usually must have 100,000 labeled examples, and sometimes even more than that, to train a supervised machine learning pipeline without overfitting. In some situations, cutting your vocabulary size by half can be worth the loss of information content.

> IMPORTANT! The best way to find out what works is to try several different approaches, and see which approach gives you the best performance for the objectives of your NLP project.

> By generalizing your model to work with text that has odd capitalization, case normalization can reduce overfitting for your machine learning pipeline.

Stemming

> For example, the words housing and houses share the same stem, house. Stemming removes suffixes from words in an attempt to combine words with similar meanings together under their common stem. 

> In machine learning this is referred to as dimension reduction.

> So, as long as your application doesn’t require your machine to distinguish between “house” and “houses,” this stem will reduce your programming or dataset size by half or even more.

> Stemming is important for keyword search or information retrieval. It allows you to search for “developing houses in Portland” and get web pages or documents that use both the word “house” and “houses” and even the word “housing,” because these words are all stemmed to the “hous” token.

> This broadening of your search results would be a big improvement in the “recall” score for how well your search engine is doing its job at returning all the relevant documents.

> But stemming could greatly reduce the “precision” score for your search engine, because it might return many more irrelevant documents along with the relevant ones. In some applications this “false-positive rate”

Lemmatization

> It reduces the number of words you have to respond to, the dimensionality of your language model. Using it can make your model more general, but it can also make your model less precise, because it will treat all spelling variations of a given root word the same. For example “chat,” “chatter,” “chatty,” “chatting,” and perhaps even “chatbot” would all be treated the same in an NLP pipeline.

> Lemmatization is a potentially more accurate way to normalize a word than stemming or case normalization because it takes into account a word’s meaning. A lemmatizer uses a knowledge base of word synonyms and word endings to ensure that only words that mean similar things are consolidated into a single token.

> Consider the word better. Stemmers would strip the “er” ending from “better” and return the stem “bett” or “bet.” However, this would lump the word “better” with words like “betting,” “bets,” and “Bet’s,” rather than more similar words like “betterment,” “best,” or even “good” and “goods.”

> So lemmatizers are better than stemmers for most applications. Stemmers are only really used in large-scale information retrieval applications (keyword search). And if you really want the dimension reduction and recall improvement of a stemmer in your information retrieval pipeline, you should probably also use a lemmatizer right before the stemmer. Because the lemma of a word is a valid English word, stemmers work well on the output of a lemmatizer.

Use cases

> When should you use a lemmatizer or a stemmer? Stemmers are generally faster to compute and require less-complex code and datasets. But stemmers will make more errors and stem a far greater number of words, reducing the information content or meaning of your text much more than a lemmatizer would.

> Both stemmers and lemmatizers will reduce your vocabulary size and increase the ambiguity of the text. But lemmatizers do a better job retaining as much of the information content as possible based on how the word was used within the text and its intended meaning.

> If your application involves search, stemming and lemmatization will improve the recall of your searches by associating more documents with the same query words. However, stemming, lemmatization, and even case folding will significantly reduce the precision and accuracy of your search results.

> If your application involves search, stemming and lemmatization will improve the recall of your searches by associating more documents with the same query words. However, stemming, lemmatization, and even case folding will significantly reduce the precision and accuracy of your search results. These vocabulary compression approaches will cause an information retrieval system (search engine) to return many documents not relevant to the words’ original meanings.

> IMPORTANT Bottom line, try to avoid stemming and lemmatization unless you have a limited amount of text that contains usages and capitalizations of the words you are interested in. And with the explosion of NLP datasets, this is rarely the case for English documents, unless your documents use a lot of jargon or are from a very small subfield of science, technology, or literature.

Sentiment

> Whether you use raw single-word tokens, n-grams, stems, or lemmas in your NLP pipeline, each of those tokens contains some information. An important part of this information is the word’s sentiment—the overall feeling or emotion that the word invokes.

> Companies like to know what users think of their products. So they often will provide some way for you to give feedback. A star rating on Amazon or Rotten Tomatoes is one way to get quantitative data about how people feel about products they’ve purchased. But a more natural way is to use natural language comments. Giving your user a blank slate (an empty text box) to fill up with comments about your product can produce more detailed feedback.

> An NLP pipeline can process a large quantity of user feedback quickly and objectively, with less chance for bias. And an NLP pipeline can output a numerical rating of the positivity or negativity or any other emotional quality of the text.

There are two approaches to sentiment analysis:
 A rule-based algorithm composed by a human
 A machine learning model learned from data by a machine

> The first approach to sentiment analysis uses human-designed rules, sometimes called heuristics, to measure sentiment. A common rule-based approach to sentiment analysis is to find keywords in the text and map each one to numerical scores or weights in a dictionary or “mapping”.

> The second approach, machine learning, relies on a labeled set of statements or documents to train a machine learning model to create those rules. A machine learning sentiment model is trained to process input text and output a numerical value for the sentiment you are trying to measure, like positivity or spamminess or trolliness. For the machine learning approach, you need a lot of data, text labeled with the “right” sentiment score.

## Chapter 3. MAth with words (TF-IDF vectors)

> This chapter covers counting words and term frequencies to analyze meaning, predicting word occurrence probabilities, vector representation of words, finding relevant documents from a corpus using
inverse document frequencies and estimating the similarity with cosine and BM25.

> Having collected and counted words (tokens), and bucketed them into stems or lemmas, it’s time to do something interesting with them. Detecting words is useful for simple tasks, like getting statistics about word usage or doing keyword search. But you’d like to know which words are more important to a particular document and across the corpus as a whole.

> Then you can use that “importance” value to find relevant documents in a corpus based on keyword importance within each document.

> The next step in your adventure is to turn the words of chapter 2 into continuous numbers rather than just integers representing word counts or binary “bit vectors” that detect the presence or absence of particular words.

> Your goal is to find numerical representation of words that somehow capture the importance or information content of the words they represent. You’ll have to wait until chapter 4 to see how to turn this information content into numbers that represent the meaning of words.

> We'll look at three increasingly powerful ways to represent words and their importance in a document:

- Bags of words—Vectors of word counts or frequencies
- Bags of n-grams—Counts of word pairs (bigrams), triplets (trigrams)
- TF-IDF vectors—Word scores that better represent their importance

> IMPORTANT TF-IDF stands for term frequency times inverse document frequency. Term frequencies are the counts of each word in a document, which you learned about in previous chapters. Inverse document frequency means that you’ll divide each of those word counts by the number of documents in which the word occurs.

> Each of these techniques can be applied separately or as part of an NLP pipeline. These are all statistical models in that they are frequency based.

Bag of words

> In the previous chapter, you created your first vector space model of a text. You used one-hot encoding of each word and then combined all those vectors with a binary OR (or clipped sum) to create a vector representation of a text.

> You then looked at an even more useful vector representation that counts the number of occurrences, or frequency, of each word in the given text.

> As a first approximation, you assume that the more times a word occurs, the more meaning it must contribute to that document.

```python
from nltk.tokenize import TreebankWordTokenizer
from collections import Counter

sentence = """The faster Harry got to the store, the faster Harry,
... the faster, would get home."""
tokenizer = TreebankWordTokenizer()
tokens = tokenizer.tokenize(sentence.lower())
tokens
['the',
'faster',
'harry',
'got',
'to',
'the',
'store',
',',
'the',
'faster',
'harry',
',',
'the',
'faster',
',',
'would',
'get',
'home',
'-']

bag_of_words = Counter(token
bag_of_words

Counter({'the': 4,
  'faster': 3,
  'harry': 2,
  'got': 1,
  'to': 1,
  'store': 1,
  ',': 3,
  'would': 1,
  'get': 1,
  'home': 1,
  '.': 1})
```

> For short documents like this one, the unordered bag of words still contains a lot of information about the original intent of the sentence. And the information in a bag of words is sufficient to do some powerful things such as detect spam, compute sentiment (positivity, happiness, and so on), and even detect subtle intent, like sarcasm.

> Let’s pause for a second and look a little deeper at normalized term frequency, a phrase (and calculation) we use often throughout this book.

```python
bag_of_words.most_common(4)
[('the', 4), (',', 3), ('faster', 3), ('harry', 2)]

times_harry_appears = bag_of_words['harry']
num_unique_words = len(bag_of_words)

tf = times_harry_appears / num_unique_words
round(tf, 4)
0.1818
```

> Let’s say you find the word “dog” 3 times in document A and 100 times in document B. Clearly “dog” is way more important to document B. But wait. Let’s say you find out document A is a 30-word email to a veterinarian and document B is War & Peace (approx 580,000 words!).

```python
TF(“dog,” documentA) = 3/30 = .1
TF(“dog,” documentB) = 100/580000 = .00017
```

> Now you have something you can see that describes “something” about the two documents and their relationship to the word “dog” and each other. So instead of raw word counts to describe your documents in a corpus, you can use normalized term frequencies. Similarly you could calculate each word and get the relative importance to the document of that term. Your protagonist, Harry, and his need for speed are clearly central to the story of this document.

Vectorizing

> You’ve transformed your text into numbers on a basic level. But you’ve still just stored them in a dictionary, so you’ve taken one step out of the text-based world and into the realm of mathematics. Next you’ll go ahead and jump in all the way. Instead of describing a document in terms of a frequency dictionary, you’ll make a vector of those word counts.

```python
document_vector = []
doc_length = len(tokens)
for key, value in kite_counts.most_common():
    document_vector.append(value / doc_length)
document_vector
[0.07207207207207207,
0.06756756756756757,
0.036036036036036036,
...,
0.0045045045045045045]
```

> Having one vector for one document isn’t enough. You can grab a couple more documents and make vectors for each of them as well. But the values within each vector need to be relative to something consistent across all the vectors. If you’re going to do math on them, they need to represent a position in a common space, relative to something consistent.

> Your vectors need to have the same origin and share the same scale, or “units,” on each of their dimensions.

> The first step in this process is to normalize the counts by calculating normalized term frequency instead of raw count in the document (as you did in the last section); the second step is to make all the vectors of standard length or dimension.

> This collections of words in your vocabulary is often called a lexicon, which is the same concept referenced in earlier chapters, just in terms of your special corpus.

```python
from collections import Counter

# docs is 3 docuemnts

docs = [
    "The faster Harry got to the store, the faster and faster Harry would get home.",
    "Harry is hairy and faster than Jill.",
    "Jill is not as hairy as Harry."
]

tokenized_docs = [
    doc.lower()
       .replace(",", "")
       .replace(".", "")
       .split()
    for doc in docs
]

vocab = sorted(set(
    token
    for doc in tokenized_docs
    for token in doc
))

['and', 'as', 'faster', 'get', 'got', 'hairy', 'harry',
 'home', 'is', 'jill', 'not', 'store', 'than', 'the',
 'to', 'would']


# Now convert each document into a word-count vector using the same vocabulary:

def vectorize(tokens, vocab):
    counts = Counter(tokens)

    return [counts[word] for word in vocab]

doc_vectors = [
    vectorize(tokens, vocab)
    for tokens in tokenized_docs
]

for vector in doc_vectors:
    print(vector)

Document 1 → [1, 0, 3, 1, 1, 0, 2, 1, 0, 0, 0, 1, 0, 3, 1, 1]
Document 2 → [1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]
Document 3 → [0, 2, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0]

# The important idea is that every position always represents the same word:

              and  as  faster  get  got  hairy  harry  ...
Document 1 →   1    0     3     1    1     0      2    ...
Document 2 →   1    0     1     0    0     1      1    ...
Document 3 →   0    2     0     0    0     1      1    ...

# So we now have three vectors, one for each document, all living in the same vector space.
```

Vector spaces

> A vector space is the set of all possible vectors with the same number of dimensions. A vector with 2 values lives in 2D, 3 values in 3D, and an NLP document with thousands of features can live in a space with thousands of dimensions.

```python
2D vector space

y
↑
|        • (3,2)
|       /
|      /
|     /
|____/____________→ x
(0,0)

vector = [3, 2]
```

> In NLP, each dimension can represent a feature or vocabulary term, and each document becomes a point/vector in that shared space.

> For a natural language document vector space, the dimensionality of your vector space is the count of the number of distinct words that appear in the entire corpus. For TF (and TF-IDF to come), sometimes we call this dimensionality capital letter “K.” This number of distinct words is also the vocabulary size of your corpus, so in an academic paper it’ll usually be called “|V|.” You can then describe each document within this K-dimensional vector space by a K-dimensional vector. K = 18 in your threedocument corpus about Harry and Jill.

> Euclidean distance cares about both direction and magnitude, while cosine similarity mainly cares about direction. In NLP, direction is often more useful because documents of different lengths can still use words in very similar proportions.

![ cosine similarity for vector words ](/../graphics/nlp-in-action/cosine_sim_vector.png)

> For NLP document vectors that have a cosine similarity close to 1, you know that the documents are using similar words in similar proportion. A cosine similarity of 0 represents two vectors that share no components. They are orthogonal, perpendicular in all dimensions.

Zipf’s Law (predicting word occurrence)

> Specifically, inverse proportionality refers to a situation where an item in a ranked list will appear with a frequency tied explicitly to its rank in the list. The first item in the ranked list will appear twice as often as the second, and three times as often as the third, for example.

Topic modeling
