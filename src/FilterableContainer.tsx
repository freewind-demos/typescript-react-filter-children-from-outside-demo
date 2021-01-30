import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server'

type Props = {
  keyword: string
}

function filterComponents(children: React.ReactNode, keyword: string) {
  return React.Children.toArray(children)
    .filter((it): it is ReactElement => 'type' in (it ?? {}))
    .filter(it => renderToStaticMarkup(it).toLowerCase().includes(keyword));
}

export const FilterableContainer: FC<PropsWithChildren<Props>> = ({keyword, children}) => {
  return <div>{keyword ? filterComponents(children, keyword) : children}</div>;
}
