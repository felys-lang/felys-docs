# Grammar File

Felys grammar file uses customized [syntax](../rspegen/syntax.md) to generate the parser and lexer. However, due to limitations of the parser generator, the non-terminals `ident` and `eof` are still written by hand. Their implementations can be found in the source code.

```
{
    use crate::ast::*;
    #[allow(unused)]
    use std::rc::Rc;
}

grammar -> { Grammar }:
    / stmts=(stmt=stmt $)* #eof { Grammar(stmts) }
    ;

@(memo)
pat -> { Pat }:
    / @(token)('_' !IB) { Pat::Any }
    / ident=ident { Pat::Ident(ident) }
    / lit=lit { Pat::Lit(lit) }
    / '(' first=pat ',' second=#pat more=(',' pat=#pat)* #')' { {
        let mut elements = more;
        elements.insert(0, second);
        elements.insert(0, first);
        Pat::Tuple(elements)
    } }
    ;

stmt -> { Stmt }:
    / expr=expr ';' { Stmt::Semi(expr) }
    / expr=expr { Stmt::Expr(expr) }
    / ';' { Stmt::Empty }
    ;

block -> { Block }:
    / '{' stmts=stmt* #'}' { Block(stmts) }
    ;

@(memo)
expr -> { Expr }:
    / assignment=assignment
    / disjunction=disjunction
    / block=block { Expr::Block(block) }
    / @(token)('break' !IB) expr=expr? { Expr::Break(expr.map(Rc::new)) }
    / @(token)('continue' !IB) { Expr::Continue }
    / @(token)('for' !IB) pat=#pat @(token)(#'in' !IB) expr=#expr block=#block {
        Expr::For(pat, expr.into(), block)
    }
    / @(token)('if' !IB) expr=#expr block=#block otherwise=otherwise? {
        Expr::If(expr.into(), block, otherwise.map(Rc::new))
    }
    / @(token)('loop' !IB) block=#block { Expr::Loop(block) }
    / @(token)('return' !IB) expr=expr? { Expr::Return(expr.map(Rc::new)) }
    / @(token)('while' !IB) expr=#expr block=#block { Expr::While(expr.into(), block) }
    ;

otherwise -> { Expr }: @(token)('else' !IB) expr=#expr ;

assignment -> { Expr }:
    / pat=pat '=' !'=' expr=#expr { Expr::Assign(pat, AssOp::Eq, expr.into()) }
    / pat=pat '+=' expr=#expr { Expr::Assign(pat, AssOp::AddEq, expr.into()) }
    / pat=pat '-=' expr=#expr { Expr::Assign(pat, AssOp::SubEq, expr.into()) }
    / pat=pat '*=' expr=#expr { Expr::Assign(pat, AssOp::MulEq, expr.into()) }
    / pat=pat '/=' expr=#expr { Expr::Assign(pat, AssOp::DivEq, expr.into()) }
    / pat=pat '%=' expr=#expr { Expr::Assign(pat, AssOp::ModEq, expr.into()) }
    ;

disjunction -> { Expr }:
    / lhs=disjunction @(token)('or' !IB) rhs=#conjunction {
        Expr::Binary(lhs.into(), BinOp::Or, rhs.into())
    }
    / conjunction=conjunction
    ;

conjunction -> { Expr }:
    / lhs=conjunction @(token)('and' !IB) rhs=#inversion {
        Expr::Binary(lhs.into(), BinOp::And, rhs.into())
    }
    / inversion=inversion
    ;

inversion -> { Expr }:
    / @(token)('not' !IB) inversion=#inversion { Expr::Unary(UnaOp::Not, inversion.into()) }
    / equality=equality
    ;

equality -> { Expr }:
    / lhs=equality '==' rhs=#comparison { Expr::Binary(lhs.into(), BinOp::Eq, rhs.into()) }
    / lhs=equality '!=' rhs=#comparison { Expr::Binary(lhs.into(), BinOp::Ne, rhs.into()) }
    / comparison=comparison
    ;

comparison -> { Expr }:
    / lhs=comparison '>=' rhs=#term { Expr::Binary(lhs.into(), BinOp::Ge, rhs.into()) }
    / lhs=comparison '<=' rhs=#term { Expr::Binary(lhs.into(), BinOp::Le, rhs.into()) }
    / lhs=comparison '>' rhs=#term { Expr::Binary(lhs.into(), BinOp::Gt, rhs.into()) }
    / lhs=comparison '<' rhs=#term { Expr::Binary(lhs.into(), BinOp::Lt, rhs.into()) }
    / term=term
    ;

term -> { Expr }:
    / lhs=term '+' rhs=#factor { Expr::Binary(lhs.into(), BinOp::Add, rhs.into()) }
    / lhs=term '-' rhs=#factor { Expr::Binary(lhs.into(), BinOp::Sub, rhs.into()) }
    / factor=factor
    ;

factor -> { Expr }:
    / lhs=factor '*' rhs=#unary { Expr::Binary(lhs.into(), BinOp::Mul, rhs.into()) }
    / lhs=factor '/' rhs=#unary { Expr::Binary(lhs.into(), BinOp::Div, rhs.into()) }
    / lhs=factor '%' rhs=#unary { Expr::Binary(lhs.into(), BinOp::Mod, rhs.into()) }
    / unary=unary
    ;

unary -> { Expr }:
    / '+' unary=#unary { Expr::Unary(UnaOp::Pos, unary.into()) }
    / '-' unary=#unary { Expr::Unary(UnaOp::Neg, unary.into()) }
    / call=call
    ;

call -> { Expr }:
    / call=call '(' args=args? #')' {
        Expr::Call(call.into(), args.unwrap_or_default())
    }
    / primary=primary
    ;

args -> { Vec<Expr> }:
    / first=expr more=(',' expr=#expr)* { {
      let mut elements = more;
      elements.insert(0, first);
      elements
    } }
    ;

primary -> { Expr }:
    / lit=lit { Expr::Lit(lit) }
    / ident=ident { Expr::Ident(ident) }
    / '(' expr=#expr ')' { Expr::Paren(expr.into()) }
    / '(' first=#expr #',' second=#expr more=(',' expr=#expr)* #')' { {
        let mut elements = more;
        elements.insert(0, second);
        elements.insert(0, first);
        Expr::Tuple(elements)
    } }
    / '[' args=args? #']' { Expr::List(args.unwrap_or_default()) }
    / '|' params=params? #'|' expr=#expr {
        Expr::Closure(params.unwrap_or_default(), expr.into())
    }
    ;

params -> { Vec<Ident> }:
    / first=ident more=(',' ident=#ident)* { {
        let mut elements = more;
        elements.insert(0, first);
        elements
    } }
    ;

lit -> { Lit }:
    / float=FLOAT { Lit::Float(float) }
    / int=INT { Lit::Int(int) }
    / str=str { Lit::Str(str) }
    / bool=bool { Lit::Bool(bool) }
    ;

@(token)
str -> { Vec<Chunk> }: '"' chunks=chunk* #'"' ;

@(token)
chunk -> { Chunk }:
    / slice=SLICE { Chunk::Slice(slice) }
    / '\\u{' hex=#HEX #'}' { Chunk::Unicode(hex) }
    / '\\' escape=#ESCAPE { Chunk::Escape(escape) }
    ;

@(token)
bool -> { Bool }:
    / 'true' !IB { Bool::True }
    / 'false' !IB { Bool::False }
    ;

IB: [a-zA-Z0-9_] ;

@(intern) {
    INT: '0' | [1-9][0-9]* ;
    FLOAT: [1-9][0-9]* '.' [0-9]+ | '0.' [0-9]+;
    IDENT: [a-zA-Z_] IB* ;
    SLICE: [^"\\]+ ;
    HEX: [0-9a-f]* ;
    ESCAPE: ['ntr\\] ;
}

@(ws) {
    WS: [\u{20}\n\t\r]+ ;
    COMMENT: '//' [^\n]* ;
}
```
