import { connectHits } from 'react-instantsearch-dom';
import Hit from './SearchHit/SearchHit';

const hits = ({ hits, clicked }) => {
  return (
    <ol>
      {hits.map(hit => <Hit key={hit.objectID} hit={hit} clicked={clicked} />)}
    </ol>
  )
}

export default connectHits(hits);