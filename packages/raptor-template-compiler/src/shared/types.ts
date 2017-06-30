import * as babelTypes from 'babel-types';
import * as parse5 from 'parse5-with-errors';

export type TemplateIdentifier = babelTypes.Identifier;
export type TemplateExpression =
    | babelTypes.MemberExpression
    | babelTypes.Literal
    | babelTypes.Identifier;

export type HTMLText = parse5.AST.TextNode;
export type HTMLElement = parse5.AST.Element;
export type HTMLNode =
    | HTMLElement
    | HTMLText;

export interface SlotDefinition {
    [key: string]: IRNode[];
}

export interface ForEach {
    expression: TemplateExpression;
    item: TemplateIdentifier;
    index?: TemplateIdentifier;
}

export interface ForIterator {
    expression: TemplateExpression;
    iterator: TemplateIdentifier;
}

export interface IRElement {
    type: 'element';
    tag: string;

    attrsList: parse5.AST.Default.Attribute[];

    parent?: IRElement;
    children: IRNode[];

    __original: HTMLElement;

    component?: string;

    className?: TemplateExpression;
    classMap?: { [name: string]: true };

    on?: { [name: string]: TemplateExpression };

    style?: { [name: string]: string | number };

    attrs?: { [name: string]: IRAttribute };
    props?: { [name: string]: IRAttribute };

    if?: TemplateExpression;
    ifModifier?: string;

    forEach?: ForEach;
    forOf?: ForIterator;
    forKey?: TemplateExpression;

    slotName?: string;
    slotSet?: SlotDefinition;
}

export interface IRText {
    type: 'text';
    value: string | TemplateExpression;

    parent?: IRElement;

    __original: HTMLText;
}

export type IRNode =
    | IRElement
    | IRText;

export enum IRAttributeType {
    Expression,
    String,
    Boolean,
}

export interface IRBaseAttribute {
    name: string;
    location: parse5.MarkupData.Location;
    type: IRAttributeType;
}

export interface IRExpressionAttribute extends IRBaseAttribute {
    type: IRAttributeType.Expression;
    value: TemplateExpression;
}

export interface IRStringAttribute extends IRBaseAttribute {
    type: IRAttributeType.String;
    value: string;
}

export interface IRBooleanAttribute extends IRBaseAttribute {
    type: IRAttributeType.Boolean;
    value: true;
}

export type IRAttribute =
    | IRStringAttribute
    | IRExpressionAttribute
    | IRBooleanAttribute;

export type WarningLevel = 'info' | 'warning' | 'error';

export interface CompilationWarning {
    message: string;
    start: number;
    length: number;
    level: WarningLevel;
}

export interface CompilationOptions {
    computedMemberExpression?: boolean;
}

export interface CompilationMetadata {
    templateUsedIds: string[];
    definedSlots: string[];
    templateDependencies: string[];
}

export interface CompilationOutput {
    code: string;
    ast: babelTypes.Node;
}