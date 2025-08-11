---
layout: post
title: "Finite Vector Fields Visualized"
math: true
---

I won't keep you waiting, here's the visualizer. Instructions and explanations are below, as most of you will skip over them anyway.

{% include finite_field_visualizer/index.html %}


## About the visualizer

When studying Linear Algebra, finite fields are mentioned but rarely studied deeply. Thus finite vector
spaces remain in the shadows, lurking in the darkness to spoil a miserable student's proof. My hope is that
this visualizer would give some mental image of what finite vector spaces look like.

As we are confined to using 2-D screens, the visualizer allows you to create a two dimensional vector space.
First you choose the field (which has to be of prime size). Then you can input a transformation by inputting
the cells of the transformation matrix.

Each vector is represented by a dot or an X. An X signifies that the vector belongs to the kernel of the
transformation. If the vector is red, it means that it belongs to the image, otherwise it'll be black.
The arrows show what the image of a specific vector is. The light halo around a vector highlights vectors of
an eigenspace. Finally, the legend at the bottom maps the eigenvalues and the color associated with it, and the
determinant.

A word about the determinant. Initially I wanted to also show the determinant as part of the field, by showing
the parallelogram created by the two basis vectors. However, it quickly turned out that it's meaningless, as
geometry doesn't exist in discrete spaces, and so the parallelogram doesn't exist. This is an important insight,
as the determinant is sometimes defined as the volume of the parallelopiped created by transforming the basis vectors.
That is not correct, as it doesn't work on finite fields.
