# Everything About Felys

Felys is a dynamically strongly typed scripting language with a syntax similar to Rust. It provides minimal features to support data grouping with dynamic length, such as tuples and lists. The entire project is intended to be a toy language for demonstration purposes only. I have never considered turning this into a real product; instead, it serves as a tribute to [Elysia](https://www.youtube.com/watch?v=RUe2BDz6RO4) from Honkai Impact 3rd.

Feel to try Felys using the online [playground](https://exec.felys.dev).

## Topics

In short, there are two main topics that worth sharing: the design principle and the parser generator. The former covers all the considerations involved in designing Felys, while the latter discusses how to implement a [PEG](https://en.wikipedia.org/wiki/Parsing_expression_grammar)/[Packrat](https://en.wikipedia.org/wiki/Packrat_parser) parser along with a [DFA](https://en.wikipedia.org/wiki/Deterministic_finite_automaton)-driven lexer. Some parts may be a bit academic, but I believe this book should be accessible to any ECE/CS undergraduate beyond their first year.

## Legal Statement

Other properties and any right, title, and interest thereof and therein (intellectual property rights included) not derived from Honkai Impact 3rd belong to their respective owners.
