---
title: 'How Much of the Internet is Porn? A Detective Story'
description: TODO
---

_NB: This is a draft article, should be published within a few days._

{% .lead %} **TL;DR**&mdash;In February of 2024, I randomly sampled an exhaustive list of
over **167 million** `.com` registrable domains using a combination of manual hueristics
and machine learning to test each for pornagraphic content. I was able to test a
statistically significant sample size of **103,676** (0.1957%) reachable websites, and
found **0.64% of them were porn.**

While sampling only `.com` domains is inherently a crude proxy for the larger question, I
posit that it is valuable nonetheless, because it at least is a reasonable proxy, and
gives us a starting point to extrapolate based on some kind of hard evidence, as well has
laying the groundwork for an improved methodology and future experiments.

For the interested reader, the rest of this post gives much greater detail on:

- Backstory
- Prior art
- Defining the scope
- Methodology
- Flaws
- Implementation details
- Interesting facts
- Steps to replicate
- Possible next steps

## Backstory

I run a [business](/) that aims to help parents keep their kids safe on the internet. So
I've got a dog in this fight. I've often felt a desire to (truthfully) quantify the
magnitude of the problem of pornography in such a way that it grabs the attention of
parents, and helps break through the understandable lethargy and discouragement that
average parents feel when it comes to supervising and restricting their kids tech.

But there is a real scarcity of concrete, scientific-ish evidence addressing the question
of just how much of the internet is porn. And for good reason - it's a squishy question
that admits of many levels and layers of interpretation. Plus, it's an unpleasant subject
to even think about, let alone rigorously investigate.

I wasn't satisfied with the lack of real data addressing this question. And while I had no
illusions that I could definitively answer the question, I wondered if I could at least
create one meaningful data point to ground the discussion and possibly provoke further
research.

I'm particularly interested in knowing hard facts about _how many_ websites, or _what
percentage_ of all websites are pornographic. That's because that answer has a direct
bearing on the work I do for parents. While the top 5% of porn sites might account (for
all I know) for 95%+ of all pornographic consumption, I'm more interested in the long-tail
of the millions of lesser-known porn sites. That's for a very pragmatic reason - many
companies sell parents on the idea that they can keep their kids away from porn by means
of a block-list: check each outgoing request against a known list of adult sites. My
contention is that this is a fool's errand: there are just too many porn sites, and new
ones being created daily. A motivated (\*cough cough) searcher would need only to persist
past the first dozen blocked websites before Google turned up some obscure niche site not
on the blocklist.

This isn't just conjecture. When my kids (I have four) entered their teen years, I
installed a [pihole](/#fixme) to do DNS-level blocking in our home network, and subscribed
to the most up-to-date public block lists available. I literally erased millions of known
pornographic domains from existing from the perspective of my local network. But then I
decided to test it. I turned off images in my browser, started googling sexual terms and
was dissapointed to find out I only had to click around for about 90 seconds to find my
first website missed by the massive blocklist.

You see, the sheer number of pornographic sites is what makes the block-list approach
untenable. The only safe alternative for parents wanting to definitively block all adult
sites is the opposite approach: a safe-list. Every site is blocked by default, unless
explicitly allowed. This is how Gertrude works, which is rare for parental controls app.
But it all rests on the baseline assumption that there really are a huge number of
pornographic sites out there -- and that the magnitude is directly correlated to the
proper approach towards safety. So that's why I care.

## Prior Art

There are many hand-wavy claims about the prevalance and magnitude of porn on the
internet, but very few hard facts. On oft-cited statistic frequently used by people on my
side of the issue (are there people on the other side?) is that
[37% of the internet is porn.](/#fixme) But that statistic is 20+ years old, and it's
while it's not clear if it ever was accurate, there seems to be a concensus that it has
[little bearing](/#fixme) on the current state of the internet in 2024.

The most credible study I could found was from two neuroscientists, Ogi Ogas and Sai
Gaddam, who published the result of their experiments and research in a book called
[A Billion Wicked Thoughts](https://www.billionwickedthoughts.com/index.html). Their
inquiry is wide-ranging on various topics, much of it not being concerned with my core
question of the magnitude of porn, or the number of websites, but they nonetheless provide
some of the only credible, reasonably-recent research we have, including estimates like
[more than 25% of all searches are sexual in nature](https://www.nytimes.com/2011/07/31/books/review/a-billion-wicked-thoughts-by-ogi-ogas-and-sai-gaddam-book-review.html),
and porn accounts for
[10% of the material on the internet](https://www.psychologytoday.com/us/blog/all-about-sex/201611/dueling-statistics-how-much-the-internet-is-porn)
. (Disclosure: I've not read their book, only articles summarizing it.)

## Narrowing the scope

Imagine you want to definitely answer this question in a scientific way. If real
constraints of space/time/budget/technology were magically whisked away, the path forward
would be conceptually straightforward:

1. Create a tool to categorize websites as "porn" or "not porn"
2. Obtain a list of every website in the world
3. Test every website on the list

Of these three steps, number one is straightforwardly solvable, at least with some amount
of margin of error. Pretending for a moment that #2 were possible (more on that below), #3
is not actually required. The well-understood field of statistics tells us that we can get
a very reasonable approximation of the final answer by examining a large enough sample
size.

Which leaves #2 as the real heart of the problem. A few companies probably have the
internal data to actually build such a list: Google, Micrsoft, possibly Ahrefs. But none
of them are putting that list up for sale, and even if it was available, it would likely
be terabytes in size.

So, if we can't get our hands on such a list (or create one ourselves), perhaps there is a
meaningful proxy -- something that would not be truly ideal, but good enough to shed at
least _some_ light on the question.

### Domains and Websites...

One data point that is (semi-) public, are **domains**. However a domain is not the same
thing as a website. Many domains exist with no website attached to them (for the purpose
of running email servers only, or for domain speculation, etc). And, on the other hand,
some domains host many websites, each at a different **subdomain**.

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

## Methodology

The basic conceptual methodology of the experiment is conceptually this:

1. Obtain a list of every `.com` domain
2. Select a random domain from the list (e.g. `cats.com`)
3. If no publicly reachable website can be found at the root (`cats.com`) or www subdomain
   (`www.cats.com`), note the domain as unreachable, and go back to step #2.
4. If a reachable site is found, check if it's just a "domain is parked" placeholder site,
   and if so, record the result and return to step #2.
5. If we get to this step, we have found a reachable, non-parked public website. Time to
   check it for pornographic content.
6. Next we download and collect all of the human-facing text from the website's HTML, and
   test it for words and phrases strongly correlated with pornography (weighting different
   portions of the text differently, e.g. the `<title>` tags, `<h1>` and `<image />` `alt`
   attributes are weighed more heavily). If the score from this step indicates an
   overwhelming likelihood of the site being pornographic, record the result and skip to
   step #8.
7. Many pornographic sites are not clearly discernable from text alone (some porn sites
   have very few words, and even for the ones with lots of text content, I only checked
   English words and phrases), so it's fair to consider step #6 as a performance
   optimization. In this step, we actually download up to the first 50 images referenced
   in the site's HTML, and check them agains a machine learning model to classify them as
   porn or not porn. Record the result of the image check, and move to step #8.
8. If we've discovered and tested enough reachable websites to hit our sample size target,
   we're done! We can check our records and find out what percentage of sites are porn. If
   we're not there yet, just go back to #2.

## Flaws 💩

With that basic outline of the methodology in place (implementation details, open source
code, and steps to replicate below), now seems like a good time to talk about it's obvious
and not-so-obvious flaws.

I've already alluded to several, but for the sake of completeness, here's all of the
noteworthy flaws I can see with my approach.

#### 1. `.com` bias

As noted earlier, `.com` domains constitute less than 50% of all domains, and while that
is a hefty percentage, it's probable and likely that when objectively researching the
magnitude of porn sites, that this introduces some statistically significant abnormalities
into the data. There could easily be more or less porn in this sub-section of all domains.
For instance, there is at least one TLD 100% devoted to porn. It would be preferable to
have a truly complete list of domains to work from, or a fully representative sample.

#### 2. Extrapolating from domains to websites

This was also mostly covered in the preceding sections, but it's worth restating that
extrapolating from a domain to a website is not straightforward. While it may be granted
that most websites exist at the root of the domain, it is also clear that there is a
non-trivial percentage of websites that aren't. Furthermore, precisely defining what a
website _is_ is also hard. It's especially worth noting that some domains which host
thousands or millions of websites on free subdomains (like `wordpress.com`, `wixsite.com`,
etc.) might very well turn out to be corners of the internet densely populated with porn.
These huge networks of websites were not at all explored by this experiment.

#### 3. SPAs

The rust app I wrote to execute this experiment deals only with html sent by responding
web server. It makes no attempt to execute client-side javascript before examining the
HTML. This means that it certainly would be giving false negatives for porn sites built
purely as single-page-applications (SPAs). One would think that purveyors of internet porn
would care enough about SEO best practices to not take this approach, but it's likely
there are many sites like this out there. Future refinements of the experiment could use a
headless browser, or some javascript runtime to mitigate this issue.

#### 4. Weakness in the machine learning model

At it's core, the experiment relies on image classification to identify porn sites, so the
results are only as good as the model. The [model](https://nsfwjs.com) I used (NSFW.js)
[definitely has known issues](/#fixme), especially with pictures of
[Jeff Goldblum](/#fixme) for some odd reason. I attempted to mitigate the margin of error
here by requiring multiple images to test positive, but there is clearly going to be some
false positives and false negatives.

## Implementation Details

(this section is rough-drafty...)

The core of the experiment relies on a CLI tool I wrote in Rust,
[available here.](/#fixme) It requires a couple key dependencies: `rust/cargo` (>=
v1.7.5), `postgresql`, `bun` (>= v1.0.21 -- to run the image classification model, which
is in javascript), and a dump of `.com` domainms obtained from
[https://czds.icann.org](https://czds.icann.org).

- `rust` (>= v1.75), `cargo`
- postgresql database
- list of `.com` domains obtained from https://czds.icann.org
- `bun` `v1.0.21` or higher (https://bun.sh/docs/installation)

One way in which I tried to reach for some modicum of plausible scientific credibility was
by designing the experiment to be replicatable. To that end, the app I wrote (a cli tool
written in Rust) is open source. The source code for the app I wrote (did I mention it's
written in Rust?) is freely available online, and it should be relatively straightforward
to replicate.

One needs only to obtain a dump from

## Todo...

- porn detector api toolish thing...
- add a section showing the first 15 values from the database dump...
- add a note at the beginning that i'm not a scientist, so i'm using terms wrong, etc.

## stats

- 664 porn sites / 103676 reachable = 0.00640457 (0.64% porn)
- total 167,300,740 (167300740)
- 68.52% unreachable (31.48% reachable)
- reachable (bare or www) websites = 167300740 x .3148 = 52,666,273
- 337,305 estimated porn sites on dot.com (bare or www)
- 327,384 - (327384) checked (0.00195686 or 0.1957%)
- 54497 parked / 327384 checked (0.16646201 or 16.65% parked)

## sections

- lol: dns rate limiting
- setting up the problem
- defining our terms
- interesting facts
- extrapolations...
- imlementation details (hacks for db sampling)
- flaws...
- basic methodology
- replication (???)
- obvious next steps
  - test more domains
  - build a crawler to discover websites (instead of using domain list)
