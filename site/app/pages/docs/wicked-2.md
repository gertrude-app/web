---
title: 'How Much of the Internet is Porn? A Detective Story'
description: TODO
---

{% .lead %} **TL;DR**&mdash;In February of 2024, I randomly sampled an exhaustive list of
over **167 million** `.com` domains testing for pornographic websites. I was able to
discover and test a statistically significant sample size of **103,676** (0.1957%)
reachable websites, and found **0.64% of them were porn.**

{% .lead %} The rest of this post covers motivation, prior research, methodology,
implementation details, steps to replicate, and more.

## Motivation

I run a [business](/) that aims to help parents keep their kids safe on the internet. So
I've got a dog in this fight. I've often felt a desire to truthfully quantify the
magnitude of the problem of pornography in such a way that it grabs the attention of
parents, and helps break through the understandable lethargy and discouragement that
average mom and dads feel when it comes to supervising and restricting their kids tech.

But there is a real scarcity of high-quality, recent evidence addressing the question of
just how much of the internet is porn. And for good reason&mdash;it's a squishy question
that admits of many levels and layers of interpretation. Plus, it's an unpleasant subject
to even think about, let alone rigorously investigate.

I wasn't satisfied with the lack of real data addressing this question. And while I had no
illusions that I could definitively answer the question, I wondered if I could at least
create _one meaningful data point_ to ground the discussion and possibly provoke further
research.

### How many websites?

I'm particularly interested in knowing hard facts about _how many_ websites, or _what
percentage_ of all websites are pornographic. That's because that answer has a direct
bearing on the work I do for parents. While the top 5% of porn sites might very likely
account for 95%+ of all pornographic consumption, I'm more interested in the long-tail of
the millions of lesser-known porn sites. That's for a very pragmatic reason&mdash;many
companies sell parents on the idea that they can keep their kids away from porn by means
of a **block-list**. The idea is simple in principle: check each outgoing request against
a known list of adult sites, blocking any attempt to reach known adult sites. Sounds great
in theory, but my contention is that this is a fool's errand. Why? Because there are just
too many porn sites, and very likely new ones being created literally every day. A
motivated searcher needs only to persist past the first dozen blocked websites before
Google turned up some obscure niche site not on the blocklist.

This isn't just conjecture. When my kids (I have four) entered their teen years, I
installed a [pihole](/#fixme) to do DNS-level blocking in our home network, and subscribed
to the most up-to-date public block lists available. I literally blocked millions of
domains. But then I decided to test it. I turned off images in my browser, started
googling sexual terms and was dissapointed to find out I only had to click around for
about 90 seconds to find my first website missed by the massive blocklist.

You see, the sheer number of pornographic sites is what makes the block-list approach
untenable. The only safe alternative for parents wanting to definitively block all adult
sites is the opposite approach: a safe-list. Every site is blocked by default, unless
explicitly allowed. This is how Gertrude works, which is rare for parental controls app.
But it all rests on the baseline assumption that there really are a huge number of
pornographic sites out there -- and that the magnitude is directly correlated to the
proper approach towards safety. So that's why I care.
