---
title: 'How Much of the Internet is Porn? A Detective Story'
description: TODO
---

{% .lead %} **TL;DR**&mdash;In February of 2024, I randomly sampled an exhaustive list of
over **167 million** `.com` domains testing for pornographic websites. I was able to
discover and test a statistically significant sample size of **103,676** (0.1957%)
reachable websites, and found **0.64% of them were porn.**

{% .lead %} The rest of this post covers motivation, prior research, methodology, flaws,
implementation details, steps to replicate, and more.

## Motivation

I run a [business](/) that aims to help parents keep their kids safe on the internet. So
I've got a dog in this fight. I've often felt a desire to truthfully quantify the
magnitude of the problem of pornography in such a way that it grabs the attention of
parents, and helps break through the understandable lethargy and discouragement that
average moms and dads feel when it comes to supervising and restricting their kids tech.

But there is a real scarcity of high-quality, recent evidence addressing the question of
just how much of the internet is porn. And for good reason&mdash;it's a squishy question
that admits of many levels and layers of interpretation. Plus, it's an unpleasant subject
to even think about, let alone rigorously investigate.

I wasn't satisfied with the lack of real data addressing this question. And while I had no
illusions that I could definitively answer the question, I wondered if I could at least
create _one meaningful data point_ to ground the discussion and possibly provoke further
research.

### How many websites?

I'm particularly interested in knowing hard facts about _how many_, or _what percentage_
of all websites are pornographic. That's because that answer has a direct bearing on the
work I do for parents. While the top 5% of porn sites might very likely account for 95%+
of all pornographic consumption, I'm more interested in the long-tail of millions of
lesser-known porn sites. That's for a very pragmatic reason&mdash;many companies sell
parents on the idea that they can keep their kids away from porn by means of a
**block-list**. The idea is simple in principle: check each outgoing request against a
known list of adult sites, blocking any attempt to reach known adult sites. Sounds great
in theory, but my contention is that this is a fool's errand. Why? Because there are just
too many porn sites, and very likely new ones being created literally every day. A
motivated searcher needs only to persist past the first dozen blocked websites before
Google turned up some obscure niche site not on the blocklist.

This isn't just conjecture. When my kids (I have four) entered their teen years, I
installed a [pihole](/#fixme) to do DNS-level blocking in our home network, and subscribed
to the most up-to-date public block lists available. I literally blocked millions of
domains. But then I decided to test it. I turned off images in my browser, started
googling sexual terms and was dissapointed to find out I only had to click around for
about 90 seconds to find a website missed by the massive blocklist.

You see, the sheer number of pornographic sites is what makes the block-list approach
untenable. I argue that the only truly reliable approach for parents wanting to
definitively block all adult sites is the opposite approach: a **safe-list.** That is,
every site is blocked by default, unless explicitly allowed. This is how Gertrude works,
which makes it unusual for parental controls app. But it all rests on the baseline
assumption that there really are a huge number of unique pornographic sites out
there&mdash;and that the magnitude is directly correlated to the proper approach towards
safety. So that's why I care.

One could argue that my motivation and perspective make me unfit for rigorous scientific
inquiry into this question. I don't disagree, but I hope by documenting my thought
process, being frank about the limitations and flaws of the methodology I chose, and
making the steps replicatable for others to verify and improve on, to have somewhat
counterbalanced this critique.

## Prior research

There are many hand-wavy claims about the prevalance and magnitude of porn on the
internet, but very few hard facts. On oft-cited statistic frequently used by people on my
side of the issue (are there people on the other side?) is that
[37% of the internet is porn.](/#fixme) But that statistic is 20+ years old, and it's
while it's not clear if it ever was accurate, there seems to be a concensus that it has
[little bearing](/#fixme) on the current state of the internet in 2024.

The most credible statistics I could find came from two neuroscientists, Ogi Ogas and Sai
Gaddam, who published the result of their experimentation and research in a book called
[A Billion Wicked Thoughts](https://www.billionwickedthoughts.com/index.html). Their
inquiry is wide-ranging on various topics (much of it not being concerned with my core
question of the magnitude of porn, or the number of websites) but they nonetheless provide
some of the only credible, reasonably-recent research we have, including estimates like
[more than 25% of all searches are sexual in nature](https://www.nytimes.com/2011/07/31/books/review/a-billion-wicked-thoughts-by-ogi-ogas-and-sai-gaddam-book-review.html),
and that porn accounts for
[10% of the material on the internet](https://www.psychologytoday.com/us/blog/all-about-sex/201611/dueling-statistics-how-much-the-internet-is-porn)
. (Disclosure: I've not read their book, only articles summarizing it.)

## Arriving at a more manageable scope

Lets start with the most theoretically pure formulation of the question. If we could pull
it off, this is the question we'd actually like to answer:

{% callout type="note" title="" %}

Exactly how many pornographic websites exist?

{% /callout %}

Imagine you want to definitely answer this question in a scientific way. If real
constraints of space, time, budget, and technology were magically whisked away, the path
forward would be conceptually straightforward:

1. Create a tool to categorize websites as "porn" or "not porn"
2. Obtain a list of every website in the world
3. Test every website on the list

Of these three steps, number one is straightforwardly solvable, at least with some amount
of margin of error. Pretending for a moment that #2 were possible (more on that below), #3
is not actually required. The well-understood field of statistics tells us that we can get
a very good approximation of the final answer by examining a large enough sample size.

Which leaves #2 as the real heart of the problem. Only few companies in the world probably
have the internal data to actually build such a list: Google, Micrsoft, possibly Ahrefs.
But none of them are putting that list up for sale, and even if it was available, it would
likely be terabytes in size.

So, if we can't get our hands on such a list (or create one ourselves), perhaps there is a
meaningful proxy -- something that would not be truly ideal, but good enough to shed at
least _some_ light on the question.

### On domains and websites

One of the many vexing sub-questions to face is precisely defining what a website is, and
how to distinguish where one website ends and another ends.

It's obviously not correct to say that a domain equals a website. Some domains (think
`wordspress.com`, `vercel.com`, or `wixsite.com`, etc.) clearly host thousands or millions
of truly distinct websites. For other domains, the answer is not so clear-cut. Take this
website for example&mdash;it has three main parts built from two distinct code bases on
two different subdomains. Are those three websites? Two? One?

Also, many domains (in fact, very likely most) are not associated with any
publicly-accessible website. Domains purchased for speculation, domains parked for later
use, or domains only running other services like mail servers, are clearly not synonomous
with websites. Which really shows the true technical purpose of a domain -- at the end of
the day, all a domain is is a human-readable label for an IP address. That may not be how
we think of them, but it's essentially an implementation detail of the worlds DNS system.

Ok, so domains have a lot going against them when it comes to answering this question. But
I wasn't ready to rule them out, because they also have some very interesting properties.

1. A large percentage of domains _are_ associated with at least one website.
2. The most common address of a website is at the root (or at the `www` subdomain, which
   are essentially synonomous).
3. Many domains are associated with only a single website.
4. A non-trivial percentage of the worlds registered domains are freely available.

So, not ideal, but still worth considering. I think it's fair to conjecture that:

1. A significantly large percentage of websites are found at the either the root/apex
   domain (`example.com`) or at the `www` subdomain (`www.example.com`)
2. Most domains house only one main website

Moving on based on these intuitions, it stands to reason that if we had a list of _every
domain_ on the internet, we could probe for which domains had websites at the root or www,
filtering out those that are unreachable or parked, and use that as our proxy for "every
website in the world."

But not so fast. There are
[1578 total TLDs](https://www.icdsoft.com/blog/what-are-the-most-popular-tlds-domain-extensions/)
as of January 2022. And not all of them provide a way to query the list of domains
registered. Services and API's exist that theoretically aggregate this data, but some of
them seem sort of dodgy, and others are expensive -- plus, in the name of science (and my
wallet) I wanted this to be free for me, and by extension for others to replicate.

Thankfully however, the `.com` TLD is far and away the largest, with
[close to 50%](https://www.icdsoft.com/blog/what-are-the-most-popular-tlds-domain-extensions/)
of all domains. And, lucky for us, [ICANN](https://www.icann.org/) hosts a
[centralized zone data service](https://czds.icann.org/home) where you can request
permission to download a full list of every single `.com` domain in their database.

So, taking it together, if we can agree that "websites discoverable from a list of every
domain" is a useful proxy for "every website in the world", and that "all the dot com
domains" is a useful proxy for "every domain", then we're in business!
