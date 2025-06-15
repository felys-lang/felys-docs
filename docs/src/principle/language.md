# Programming Language

Before we get into any details, it is crucial to understand differences between languages.

## Compilation vs Interpretation

The key to determining whether a language is compiled or interpreted is to check if it is eventually translated into machine code. Machine code refers to the executable that runs directly without requiring an external runtime. Traditional languages like C/C++ and modern ones like Rust and Go are well-known examples.

Interpreted languages always require a runtime to execute the code, even if the source code goes through a compilation process. Python, Java, and JavaScript fall into this category. In terms of performance, compiled languages are usually much faster than interpreted ones, and some can reach speeds close to assembly language. However, Java can be an exception, as it is statically typed and benefits from advanced runtime optimizations, making its performance highly competitive.

Interpreted languages are usually more flexible and can easily integrate libraries written in compiled languages. For example, most machine learning libraries in CPython are actually written in C and C++, and CPython is just the interface.

## Explicit Memory Management vs Garbage Collection

Coming soon...
