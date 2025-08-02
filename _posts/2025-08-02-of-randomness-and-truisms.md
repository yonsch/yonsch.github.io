---
layout: post
title: "Of Randomness and Truisms"
math: true
---

A few months ago, during the presidential race of 2024, I stumbled upon this youtube video by The New York Times:

{% include embed/youtube.html id='xE22XjWEyQE' %}

In this video they feature Allan Lichtman, an American Historian, who had successfully predicted the results of almost every US election
since 1984. Lichtman presents a prediction system he had developed with geophysicist Vladimir Keilis-Borok. The system consists of what
he calls "keys", which are 13 true/false questions concerning topics such as scandals, social unrest and foreign policy.
If more keys are true than false the incumbent wins, and if more keys are false the challenger wins.
Based on this system Lichtman predicted that Kamala Harris would win the race. Fast forward to November,
and to Lichtman’s great dismay, Harris lost.

After watching the video I was obviously skeptical, so I did some research. By the time Lichtman made his 2024 prediction he had already
correctly predicted "almost every US election since 1984"[^footnote1]: 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016 and 2020.
The "almost" is added because in 2000 Lichtman predicted a win for Al Gore, who eventually lost to George W. Bush. Al Gore did win the
popular vote, so Lichtman still counted it as a success, giving him a 100% accuracy score up until 2024. That was enough to bring Lichtman
to the spotlight, with some news outlets nicknaming him the "Nostradamus" of presidential elections[^footnote2].
As Lichtman put it "[The keys] are the constant northern star of political prediction" [^footnote3].

The "Keys to the White House" system was developed by Allan Lichtman and Vladimir Keilis-Borok. Keilis-Borok was a geophysicist, and interestingly he had worked on a mathematical model for predicting earthquakes:

> While attending a dinner party at Caltech in 1981, Allan Lichtman met Vladimir Keilis-Borok, a leading Russian geophysicist. Both men were 
Fairchild Scholars at Caltech. Keilis-Borok was interested in applying his prediction techniques to liberal-democratic political systems. This 
was not possible for him to do within the Soviet Union, which was a one-party state, and a guest at the party referred him to Lichtman. 
Lichtman attracted Keilis-Borok's interest because he was a quantitative historian who mathematically analyzed trends in American history. 
Lichtman agreed to help Keilis-Borok apply his prediction techniques to American presidential elections.[^footnote4]

Together, the historian and the geophysicist developed a prediction model based on election data from 1860 to 1980,
and so was born the model of 13 keys.

This all sounds very promising. An interdisciplinary pair, a historian and a mathematician, using mathematical models and historical data to
predict the future. Additionally, Lichtman does have an impressive record: since any US election practically has only two possible outcomes
(Republican or Democrat) the odds of correctly guessing the outcomes of 10 out of 10 elections are
$ \left( \frac{1}{2} \right)^{10}=\frac{1}{1024} $ . So the model must be better than guessing, right?

Well, no, it doesn’t. Imagine that in 1984 you flipped 1024 coins. Heads for Democrats, Tails for Republicans. Probabilistically,
about 512 coins yielded Tails, correctly predicting Reagan’s win. Four years later you flip the same 512 successful coins, and about
256 of them again correctly predict a win for Reagan. You repeat this process for 10 elections, after which one coin has successfully
predicted 10 consecutive elections. At this point your phone is full of unanswered calls and messages from news outlets, desperate for 
an interview with you, the owner of the famous "Nostradamus" coin. 2024 comes around and everyone gathers to seek the wisdom of the magic
coin. You flip the coin, and it yields Heads. The coin has spoken.

In a country of a few hundred millions, thousands of people are going to make predictions. The odds of getting ten of them right are
even better than $ \frac{1}{1024} $, because you can usually make a better prediction than just guessing.
Obviously if an incumbent president had a terrible term it would be easy 
to predict he would lose, and predictions can also rely on polls. Whatever the odds are, given enough contestants, some of them are 
going to nail every single prediction. We turn our attention only to the successful ones, and once we do, they run out of luck.

Lichtman got the 2024 elections wrong. In a live stream[^footnote5] on his YouTube channel, Lichtman explains why:
"[The Democrats] openly, publicly, viciously trashed their sitting president". That was Lichtman’s explanation, but the comments
on that video offer another explanation, as shown in this exemplary one:

> The keys are fine, it was your reading of the keys that was wrong Allan.

The keys correctly predicted the outcomes of every US election in hindsight, and in hindsight, you can read the keys in a manner in which
the keys predicted the elections correctly. The Foreign Policy key? Lichtman argued Biden was doing great with the Ukraine war, others
not so much. Who’s right? It's only possible to tell in hindsight. The 13 keys system is therefore unfalsifiable. If its prediction is correct,
it’s because the model works. If it’s not, it’s because you read the keys wrong - if you were to read them differently the model
would work just fine. Lichtman blamed reality for not fitting with his model, the viewers blamed Lichtman for not using his own model correctly.

It’s November 6th, 2024. You wake up and hear the news: Donanld Trump won the elections. You realize that your coin prediction was wrong.
Outside your house, reporters are gathering to get your response. "How come the magic coin was wrong?" you ask your wife.
"Give it to me", she says, and flips it. Tails. "You see?" she says, "the coin is fine. You didn’t flip it right".


### Further Reading

If you liked this post, you would probably like the great book "Fooled by Randomness" by Nassim Nicholas Taleb.
It explores probability and human misconceptions about it, and was the inspiration for this post.

### Footnotes

[^footnote1]: <https://youtu.be/xE22XjWEyQE?si=mc7EFDkbu263pWMA&t=24>
[^footnote2]: <https://www.youtube.com/watch?v=7LSjUbBDmlc>, <https://www.youtube.com/watch?v=7eQrGeLrShs>
[^footnote3]: <https://youtu.be/xE22XjWEyQE?si=mc7EFDkbu263pWMA&t=110>
[^footnote4]: <https://en.wikipedia.org/wiki/The_Keys_to_the_White_House#Development>
[^footnote5]: <https://www.youtube.com/live/WuOkzSI9ySo?si=wJ8JhYwuy_lmP9wV&t=515>
