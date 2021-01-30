import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server'

type Props = {
  keyword: string
  targetComponentTypes?: any[]
}

function getChildren(component: React.ReactNode): React.ReactNode[] {
  if (typeof component === 'object') {
    return React.Children.toArray((component as any)?.props?.children)
  }
  return []
}

function isElement(node: React.ReactNode): node is ReactElement {
  return 'type' in (node ?? {}) && 'props' in (node ?? {});
}

function hasMatchedKeyword(component: React.ReactNode, keyword: string): boolean {
  if (isElement(component)) {
    return renderToStaticMarkup(component).toLowerCase().includes(keyword);
  } else {
    return false;
  }
}

function getComponentType(component: React.ReactNode): any | FC<unknown> {
  if (typeof component === 'object') {
    return (component as any).type ?? undefined;
  } else {
    return undefined
  }
}

function hasMatchedChild(component: React.ReactNode, keyword: string, targetComponentTypes: any[]): boolean {
  const componentType = getComponentType(component);
  if (targetComponentTypes.includes(componentType)) {
    return hasMatchedKeyword(component, keyword)
  }
  return getChildren(component).some(it => hasMatchedChild(it, keyword, targetComponentTypes));
}

function filterComponents(children: React.ReactNode, keyword: string, targetComponentTypes: any[]) {
  return React.Children.toArray(children)
    .filter(it => hasMatchedChild(it, keyword, targetComponentTypes))
}

export const FilterableContainer: FC<PropsWithChildren<Props>> = ({keyword, children, targetComponentTypes = []}) => {
  return <div>{keyword ? filterComponents(children, keyword, targetComponentTypes) : children}</div>;
}
