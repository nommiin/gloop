# gloop
[one bad gloop, and she do what i yoinky two big splurgs and a big ass gloopy three more yoinks, then i buy me a smoothie poured up a gloop, that's a gloop and a splurgy](https://www.youtube.com/watch?v=tPHw4aujApY)

# Usage
instantiate the `gloop` class and provide your code as the first argument, then call the `Parse` method to parse your code and the `Run` method to run your code

# Syntax
### Types
- String: use double quotes to define a string
- Numbers: write any number, uses parseFloat internally
- Statements: surround operands in `{` and `}`

### Functions:
- **one bad**
  - Takes value to the right and pushes it to the stack
  
- **gloop**
  - Adds the top two values from the stack together and pushes the result to the stack
  
- **do what i yoinky**
  - Prints out the top value from the stack
  
- **two big splurgs**
  - Uses a statement and takes two operands and immediately adds them then pushes the result to the stack
  
- **three more yoinks**
  - Like the `two big splurgs` instruction, takes three operands and adds them together; pushing the result to the stack
  
- **gloop and a splurgy**
  - Ends the program execution at any point
  
### Comments
- //: Single line comments are supported
- /\*: Multi line comments are supported but probably wonky

### Example
(as seen in `main.js`)
```
// Push values to stack with "one bad"
one bad "Hello "
one bad "World"
gloop

// Print out value on stack
do what i yoinky


// Add 2 values at once and push to stack
two big splurgs {
    32,
    64
}

// Print out value on stack
do what i yoinky

// Add 3 values at once and push to stack
three more yoinks {
    "then I buy ",
    "me a ",
    "smoothie"
}

// Print out value on stack
do what i yoinky

// End execution
gloop and a splurgy
```

# Notes
Please don't ask me to work on this anymore than the 2 hours I spent
