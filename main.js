const Instructions = {
    "gloop and a splurgy": {
        HasOperand: false,
        Execute: function( _stack, _operand ) {
            return false;
        }
    },
    "one bad": {
        HasOperand: true,
        Execute: function( _stack, _operand ) {
            _stack.push(_operand[0]);
            return true;
        }
    },
    "gloop": {
        HasOperand: false,
        Execute: function( _stack, _operand ) {
            var b = _stack.pop();
            var a = _stack.pop();
            _stack.push(a + b);
            return true;
        }
    },
    "do what i yoinky": {
        HasOperand: false,
        Execute: function( _stack, _operand ) {
            console.log(_stack.pop());
            return true;
        }
    },
    "two big splurgs": {
        HasOperand: true,
        Execute: function( _stack, _operand ) {
            _stack.push(_operand[0] + _operand[1]);
            return true;
        }
    },
    "three more yoinks": {
        HasOperand: true,
        Execute: function( _stack, _operand ) {
            _stack.push(_operand[0] + _operand[1] + _operand[2]);
            return true;
        }
    }
};

function gloop( _code ) {
    this.Code = _code;
    this.Parsed = undefined;
    this.Program = [];
    this.Operand = function( _op ) {
        if (_op.startsWith('"') == true) {
            if (_op.endsWith('"') == true) {
                return [_op.slice(1, -1)];
            } else throw `Could not parse operand "${_op}", incomplete string`;
        } else if (_op.startsWith("{") == true) {
            if (_op.endsWith("}") == true) {
                _op = _op.slice(1, -1).split(",");
                for(var i = 0; i < _op.length; i++) {
                    _op[i] = this.Operand(_op[i])[0];
                }
                return _op;
            } else throw `Could not parse operand "${_op}", incomplete statement`;
        } else {
            return [parseFloat(_op)];
        }
    }

    this.Parse = function() {
        // Clean lines+remove comments
        this.Parsed = this.Code.split("\n");
        for(var i = 0; i < this.Parsed.length; i++) {
            this.Parsed[i] = this.Parsed[i].trim();
            if (this.Parsed[i].length == 0 || this.Parsed[i].startsWith("//") == true) {
                this.Parsed.splice(i--, 1);
            } else if (this.Parsed[i].startsWith("/*") == true) {
                var j = i;
                while (this.Parsed[i].endsWith("*/") == false) {
                    i++;
                }
                this.Parsed.splice(j, (i + 1) - j);
                i -= (i + 1) - j;
            }
        }
        
        // Combine brackets
        for(var i = 0; i < this.Parsed.length; i++) {
            if (this.Parsed[i].endsWith("{") == true) {
                var j = i++;
                while (this.Parsed[i].endsWith("}") == false) {
                    this.Parsed[j] += this.Parsed[i++];
                }
                this.Parsed[j] += this.Parsed[i];
                this.Parsed.splice(j + 1, i - j);
                i -= i - j;
            }
        }
        
        // Parse instructions
        for(var i = 0; i < this.Parsed.length; i++) {
            var InstructionFound = false;
            for(var InstructionName in Instructions) {
                if (this.Parsed[i].startsWith(InstructionName) == true) {
                    var InstructionData = Instructions[InstructionName];
                    if (InstructionData.HasOperand == true) {
                        this.Program.push(new yoinky(InstructionName, this.Operand(this.Parsed[i].slice(InstructionName.length).trim())));
                    } else {
                        this.Program.push(new yoinky(InstructionName));
                    }
                    InstructionFound = true;
                    break;
                }
            }

            if (InstructionFound == false) {
                throw "Could not find instruction at \"" + this.Parsed[i] + "\""
            }
        }
        return this;
    }

    this.Stack = undefined;
    this.Run = function() {
        this.Stack = [];
        try {
            for(var i = 0; i < this.Program.length; i++) {
                if (this.Program[i].Instruction.Execute(this.Stack, this.Program[i].Operand) == false) {
                    console.log(`End of program reached at instruction ${i + 1}`);
                    break;
                }
            }
        } catch (e) {
            console.log(`Failed to execute program, "${e}" was thrown at instruction ${i + 1} (${this.Program[i].Name}:${this.Program[i].Operand})\nStack: [${this.Stack.join(", ")}]`);
        }
        return this;
    }
}

function yoinky( _name, _operand ) {
    this.Name = _name;
    this.Instruction = Instructions[this.Name];
    this.Operand = _operand;
}

new gloop(`
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
`).Parse().Run();