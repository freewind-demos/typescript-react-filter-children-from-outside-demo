import React, {FC, useState} from 'react';
import {FilterableContainer} from './FilterableContainer';

type Props = {};

const Item = ({content}: { content: string }) => {
  return <div>{content}</div>
}

export const Hello: FC<Props> = ({}) => {
  const [keyword, setKeyword] = useState('')

  return <>
    <input type={'type'} value={keyword} onChange={event => setKeyword(event.target.value)}/>
    <hr/>
    <FilterableContainer keyword={keyword} targetComponentTypes={['li', Item]}>
      <li>Apple</li>
      <div>Banana</div>
      <Item content={'Orange'}/>
    </FilterableContainer>
  </>
}
