import { useState } from 'react';
import Image from 'next/image';
import { SearchBox } from 'react-instantsearch-dom';
import classes from './Search.module.css';
import SearchHits from './SearchHits/SearchHits';

const search = () => {
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => {
    setShowDialog(true);
  }

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div>
      <div className={classes.searchIcon} onClick={openDialog}>
        <Image src="/search.svg" alt="search" width={20} height={20} />
      </div>
      {showDialog && (
        <>
          <div className={classes.backdrop}></div>
          <div className={classes.searchDialog}>
            <SearchBox 
              translations={{
                placeholder: 'Search for any product...'
              }}
            />
            <p className={classes.cancel} onClick={closeDialog}>CANCEL</p>
            {/* <Hits hitComponent={SearchHit} /> */}
            <SearchHits clicked={closeDialog} />
          </div>
        </>
      )}
    </div>
  )
}

export default search;