import React, {FC, useState} from 'react';
import {FilterableContainer} from './FilterableContainer';

type Props = {};

export const Hello: FC<Props> = ({}) => {
  const [keyword, setKeyword] = useState('')

  return <>
    <input type={'type'} value={keyword} onChange={event => setKeyword(event.target.value)}/>
    <hr/>
    <FilterableContainer keyword={keyword}>
      <div>Apple</div>
      <div>Banana</div>
    </FilterableContainer>
  </>
}
