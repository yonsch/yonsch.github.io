---
layout: post
title: "Why The Double Dabble Algorithm Works"
math: true
---

When learning to program, students are often asked to implement a function that converts
an integer to a string. Usually, what they come up with (and what they are expected to come
up with) is to iteratively use division by 10 to get the digits of the number one by one.
While this certainly works, division is considered an expensive operation, and so constrained systems
(and perhaps standard implementations as well) use an algorithm called "Double Dabble" to get the
decimal representation of a number.

To be more precise, Double Dabble is an algorithm for converting the binary representation into BCD
representation - Binary Coded Decimal. BCD uses 4 bits per decimal digit, so for example, the
number `13`, which in binary is `1101`, would be `0001_0011` in BCD - note how it encodes `1` in the
first nibble and `3` in the second. You can think of BCD as the mathematical operation that turns
`1234` into `0x1234`.

Here is how it works, according to Wikipedia:
> The algorithm then iterates n times. On each iteration, any BCD digit which is at least 5 (0101 in binary)
 is incremented by 3 (0011); then the entire scratch space is left-shifted one bit. The increment ensures 
 that a value of 5, incremented and left-shifted, becomes 16 (10000), thus correctly "carrying" into the 
 next BCD digit.

And here's an example, also from Wikipedia, of finding the decimal representation of 243:
```
0000 0000 0000   11110011   Initialization
0000 0000 0001   11100110   Shift
0000 0000 0011   11001100   Shift
0000 0000 0111   10011000   Shift
0000 0000 1010   10011000   Add 3 to ONES, since it was 7
0000 0001 0101   00110000   Shift
0000 0001 1000   00110000   Add 3 to ONES, since it was 5
0000 0011 0000   01100000   Shift
0000 0110 0000   11000000   Shift
0000 1001 0000   11000000   Add 3 to TENS, since it was 6
0001 0010 0001   10000000   Shift
0010 0100 0011   00000000   Shift
   2    4    3
       BCD
```

Puzzled? So was I. The algorithm is pretty straight forward to implement, but WHY does it work?
It turns out that it's actually really simple, but to see why we will have to reinvent it.

## Represenations of Integers

Let's begin by thinking about what a representation of an integer is. Assuming we know what an integer is
in its purest mathematical form, a representation of that integer is a string of smaller integers that
people would all interpret as the same number. So the representations `21`, `0x15`, `0b10101`
would all be representations of the same number - twenty one.

Without getting too philosophical, the point is that a representation is not just an arbitrary string,
it's a "recipe" for "creating" that number. If you wanted to actually get a feeling for what `421` is,
and wanted to place `421` coins on your desk, the representation gives you the recipe for doing that,
just by knowing the integers up to 10.

First, you put 4 coins on your desk. You then put more coins until you have 10 times what you had.
Then, you put 2 coins on the desk, and then add more coins until you have 10 times what you had.
Finally, you add 1 last coin, and you will end up with 421 coins on the desk. In that sense,
the number 421 is actually just the following operations:
```c
x = 0
x += 4
x *= 10
x += 2
x *= 10
x += 1
```

The important thing here is that 421 is that sequence of operations regardless of the base of the
representation. Let's try it with base 16:
```c
x = 0
x += 0x4      // x = 0x4
x *= 0xA      // x = 0x28
x += 0x2      // x = 0x2A
x *= 0xA      // x = 0x1A4
x += 0x1      // x = 0x1A5
```
And sure enough, `0x1A5` is 421.

## Let's Double Dabble

We are now ready to construct the Double Dabble algorithm. We will first do it "on paper",
and then see how it can be implemented. In this example, we will convert `0b10101` to its
decimal representation `21`.

First, we take `0b10101` and look at it from left to right, giving us the following operations:
```c
x = 0
x += 1
x *= 2
x += 0
x *= 2
x += 1
x *= 2
x += 0
x *= 2
x += 1
```
Now let's apply these operations to a decimal string (assume we can do math on decimal strings):
```c
x = 0   // "0"
x += 1  // "1"
x *= 2  // "2"
x += 0  // "2"
x *= 2  // "4"
x += 1  // "5"
x *= 2  // "10"
x += 0  // "10"
x *= 2  // "20"
x += 1  // "21"
```
And so we have the decimal representation!

Now we just have a final piece missing, that "assume we can do math on decimal strings". Once we do that,
we're done!

Looking at the operations, you'll see that in binary we only need to be able to do three things:
multiply by `2`, add `1`, and add `0`. Let's begin by trying to multiply a decimal string by two. Maybe
if we multiply each digit by two we will get the correct result? Let's see for `"123"`: multiplying
each digit we get `"246"`, which is correct. How about `"246"`? `6*2` is `12`, which doesn't fit in a single digit.
What we have to do is put the `2` in the ones' place, and carry that `1` to the tens' place. Thus we get:
```
2  4  6     original
4  8  12    times 2
   1        carry
4  8  2
--------
4  9  2
```
Which is the correct result. So we can multiply a decimal string by `2` (although it's a bit clumsy).
How about adding `1` and `0`? Zero is obviously not a problem as we don't need to do anything, but it
turns out that adding one is also very easy. Because we always add a `1` after we multiply by `2`,
so the number is even and thus we know that the ones' digit is not `9`. Therefore, to add `1` we simply
need to add `1` to the last digit, without any side effects.

So we have everything we need, now we just have to put it all together. This is where everything
clicks together nicely, but also where the mental steps leading here are blended into an
incomprehensible mess.

Say we have a decimal string. In BCD, each digit is encoded as 4 bits, and these groups of 4
bits are all in one long bit stream:
```
   2    4    6
|0010|0100|0110|
```
Now, say we want to multiply it by 2. As you may know, to multiply an integer by 2 we can just
shift it to the left. Shifting everything 1 bit to the left we get:
```
   2    4    6
|0010|0100|0110|

   4    8   12
|0100|1000|1100|
```
Remember, that `12` not carrying over is a problem. What we want is `0x12`, not `12`, so that we can
leave that `2` and carry that `1` over. How can we turn `12` into `0x12`, `13` into `0x13`, etc.? Well,
we can just add `6`. Where does this `6` come from? It's just the difference between (base) `10` and
(base) `16`. After adding `6` to the ones' place we get:

```
   2    4    6
|0010|0100|0110|

   4    8   12
|0100|1000|1100|

          1         <---- carry
   4    8    2 
|0100|1000|0010|
```
But, as it turns out, there is a much more elegant way to carry that `1` into the tens' place.
What if we added the six BEFORE doing the shift? This way, the most significant bit of the
nibble would be `1`, and be shifted right to where it needs to be! But wait, we are adding it
before it is multiplied by `2`, so to compensate we need to divide it by `2` and we get... `3`!
(that's not factorial)

And so we arrive at the final form: to multiply by `2`, add `3` to all digits greater or equal to `5`
(as these are the digits that will have a carry when multiplied by `2`) and shift one bit to the left.
In our example:
```
   2    4    6
|0010|0100|0110|

add 3 to ones' digit:

   2    4    9
|0010|0100|1001|

shift:

   4    9    2 
|0100|1001|0010|
```

Have another look at the example from Wikipedia. Notice how the leftmost bit is shifted
into the output buffer (equivalent to adding `0` or `1`), how the output buffer is shifted by `1`
(equivalent to multiplying by `2`), and how `3` is added to digits greater or equal to `5`.
```
0000 0000 0000   11110011   Initialization
0000 0000 0001   11100110   Shift
0000 0000 0011   11001100   Shift
0000 0000 0111   10011000   Shift
0000 0000 1010   10011000   Add 3 to ONES, since it was 7
0000 0001 0101   00110000   Shift
0000 0001 1000   00110000   Add 3 to ONES, since it was 5
0000 0011 0000   01100000   Shift
0000 0110 0000   11000000   Shift
0000 1001 0000   11000000   Add 3 to TENS, since it was 6
0001 0010 0001   10000000   Shift
0010 0100 0011   00000000   Shift
   2    4    3
       BCD
```

It suddenly makes sense!
