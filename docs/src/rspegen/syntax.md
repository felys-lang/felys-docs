# Meta Syntax

This is a fully functional meta-syntax that can bootstrap the parser generator. The non-terminals `action` and `eof` are handwritten. The former requires embedding a foreign language, so it needs to maintain a brace counter, which is non-standard.

```
{ use crate::ast::*; }

grammar -> { Grammar }:
    / import=action? $ callables=(callable=callable $)* #eof {
        Grammar { import, callables }
    }
    ;

callable -> { Callable }:
    / decorator=decorator? name=NAME '->' ty=#action #':' rule=#rule #';' {
        Callable::Rule(decorator, name, ty, rule)
    }
    / decorator=decorator? name=NAME #':' regex=#union #';' {
        Callable::Regex(decorator, name, regex)
    }
    / decorator=decorator #'{' shared=#(name=NAME #':' regex=#union #';')+ #'}' {
        Callable::Shared(decorator, shared)
    }
    ;

decorator -> { Decorator }:
    / '@' #'(' first=#tag more=(',' tag=#tag)* #')' { {
        let mut tags = more;
        tags.insert(0, first);
        Decorator { tags }
    } }
    ;

tag -> { Tag }:
    / 'memo' { Tag::Memo }
    / 'left' { Tag::Left }
    / 'token' { Tag::Token }
    / 'intern' { Tag::Intern }
    / 'ws' { Tag::Whitespace }
    ;

rule -> { Rule }:
    / '/'? first=#alter more=('/' alter=#alter)* { {
        let mut alters = more;
        alters.insert(0, first);
        Rule { alters }
    } }
    ;

alter -> { Alter }:
    / assignments=#assignment+ action=action? { Alter { assignments, action } }
    ;

assignment -> { Assignment }:
    / name=NAME '=' item=#item { Assignment::Named(name, item) }
    / lookahead=lookahead { Assignment::Lookahead(lookahead) }
    / item=item { Assignment::Anonymous(item) }
    / '$' { Assignment::Clean }
    ;

lookahead -> { Lookahead }:
    / '&' atom=#atom { Lookahead::Positive(atom) }
    / '!' atom=#atom { Lookahead::Negative(atom) }
    ;

item -> { Item }:
    / atom=atom '?' { Item::Optional(atom) }
    / atom=atom '*' { Item::ZeroOrMore(atom) }
    / eager='#'? atom=atom '+' { Item::OnceOrMore(eager.is_some(), atom) }
    / eager='#'? atom=atom { Item::Name(eager.is_some(), atom) }
    ;

atom -> { Atom }:
    / decorator=decorator? '(' rule=#rule #')' { Atom::Nested(decorator, rule) }
    / string=string { Atom::String(string) }
    / name=NAME { Atom::Name(name) }
    ;

union -> { Regex }:
    / lhs=union '|' rhs=#concat { Regex::Union(lhs.into(), rhs.into()) }
    / concat=concat { concat }
    ;

concat -> { Regex }:
    / lhs=concat rhs=repeat { Regex::Concat(lhs.into(), rhs.into()) }
    / repeat=repeat { repeat }
    ;

repeat -> { Regex }:
    / inner=repeat '+' { Regex::OnceOrMore(inner.into()) }
    / inner=repeat '*' { Regex::ZeroOrMore(inner.into()) }
    / primary=primary { Regex::Primary(primary) }
    ;

primary -> { Primary }:
    / '(' regex=#union #')' { Primary::Parentheses(regex.into()) }
    / string=string { Primary::Literal(string) }
    / name=NAME { Primary::Name(name) }
    / set=set { set }
    ;

@(token)
set -> { Primary }:
    / '[' '^' set=#range+ #']' { Primary::Exclude(set) }
    / '[' set=#range+ #']' { Primary::Include(set) }
    ;

@(token)
string -> { Vec<usize> }:
    / '\'' string=#LCH+ #'\'' { string }
    ;

@(token)
range -> { (usize, usize) }:
    / start=SCH '-' end=#SCH { (start, end) }
    / ch=SCH { (ch, ch) }
    ;

@(intern, memo)
NAME: [a-zA-Z_][a-zA-Z0-9_]* ;

@(intern) {
    LCH: UNICODE | ESCAPE | [^\'\\] ;
    SCH: UNICODE | ESCAPE | [^\]\\] ;
}

@(ws) {
    WS: [\u{20}\n\t\r]+ ;
    COMMENT: '//' [^\n]* ;
}

UNICODE: '\\' 'u' '{' [0-9a-f]* '}' ;
ESCAPE: '\\' [\'\[\]ntr\\] ;
```
