---
layout: post
title: "An interview question revisited"
---

A long while ago I was asked the following question in an interview:
> Write a function that receives either a 5 or a 7 and returns 7 or 5 respectively, without using if statements.

During the interview I was able to think of two ways of doing it, and on the way home I thought of another one.
It is now time to get closure and overthink this question into retirement.

To make things more interesting, here are the rules of the game:
1. Only integer and bit operations are allowed (no floats, but integer division is allowed)
2. The different solutions have to be fundamentally different, e.g. `x + 2` and `2 + x` are considered the same
3. I only have to solve it for 5 and 7, not for any two numbers
4. The function can be assumed to never receive anything other than 5 or 7
5. No language specific feature may be used, including the standard library

Try to think of as many solutions as you can first, if you want the challenge.

Here's my list, implemented in Python. I'll keep updating this as I think of more. Try to figure out why they work first, then
read the explanations below:
```python
def func1(x):
    return 12 - x

def func2(x):
    return 35 // x

def func3(x):
    return (0,0,0,0,0,7,0,5)[x]

def func4(x):
    return 44 % x + 3

def func5(x):
    return (x * x - 14 * x + 59) // 2

def func6(x):
    return 2 ^ x

def func7(x):
    return 5 | (7 - x)

def func8(x):
    return (736 >> x) & 7

def func9(x):
    return (x == 7) * 5 + (x == 5) * 7

```

## func1
This is the most obvious one. `5 + 7 = 12`, so subtracting 7 yields 5 and vice versa.

## func2
This is similar to `func1` but uses multiplication and division instead.

## func3
This one uses a map (in this case a tuple) to map 5 to 7 and 7 to 5. This could also have been done with a dictionary
or some other data structure, but that's only an implementation detail. Adding them would violate rule number 2, so
only this one counts. I chose the tuple and not the dictionary because it would also work in lower level languages.

## func4
The initial idea was to find a number that has a remainder of 5 when divided by 7, and a remainder of 7 when divided
by 5. Unfortunately the remainder can't be greater than the divisor, so we need to work with smaller numbers and add
a constant to them. I first came up with `7 % x + 5`, but it seemed a bit too similar to `func1`, so I picked other numbers.

## func5
We could plot `(5,7)` and `(7,5)` on a graph and think of functions that go through both points. This would give an
infinite amount of solutions, and would be boring (giving birth to the first rule). `func1` and `func2` are already
such functions, so to make this different enough I found a parabola that goes through both points. Originally
this was `0.5x*x -7*x+29.5` but to avoid floating points everything is multiplied by two and then divided by two
so that everything is done in integer-land.

## func6
5, 7 and 2 in binary are `101`, `111`, `010` respectively. Xoring a bit with a zero doesn't change it, and xoring
it with 1 flips it. Xoring with 2 therefore flips the second bit of the number, turning 5 to 7 and vice versa.

## func7
This one uses bitwise-or to flip the middle bit. This might be too similar to `func6`, but since it uses a different operator
I think it's different enough.

## func8
736 in binary is `1011100000`. You can see that 5 and 7 are hiding in there, sharing a bit! Shifting it by
5 would step 7 into the spotlight (i.e. being and-ed with `111`), and similarily with 7 and 5.

## func9
This is a classic branchless technique. `(x==7)` is `True` or `False`, and when multiplied by an integer they become
1 and 0. So it becomes either `1 * 5 + 0 * 7` or `0 * 5 + 1 * 7`. I argue this doesn't violate rule number 5 because
most languages can convert a boolean to either 0 or 1. In other languages (such as C) the `==` operator yields 0 or
1 anyway.


That's it for now, I can move on in peace.
