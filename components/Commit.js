/* eslint-disable react/jsx-key */
import {useState, useEffect} from 'react'
import { getDocumentationUpdates } from '../pages/api/apiService';

function Commit({commitdata, index}) {

  const [doc, setDoc] = useState("");
  const getDocumentation = (sha) => {
    getDocumentationUpdates("Team-Boyd-Granville", "Boyd-Granville", sha)
    .then(resp => {
      console.log(resp);
        setDoc(resp);
        })
        .catch(error => {
            alert("Error getting starred repos, see log");
            console.log(error);
          });
  };

  useEffect(() => {
    if (JSON.stringify(commitdata).split(',')[3] !== 'undefined') {
      // getDocumentation(JSON.stringify(commitdata).split(',')[3]);
      // getDocumentation(JSON.stringify(commitdata).split(',')[4]);
    }
      }, [commitdata]);

  return (
    <div>
        <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <small className="text-muted">{JSON.stringify(commitdata).split(',')[1]}</small>
                </div>
                <p className="mb-1">{JSON.stringify(commitdata).split(',')[2].substring(0, JSON.stringify(commitdata).split(',')[2].length-1)}</p>

                {(typeof JSON.stringify(commitdata).split(',')[3] === 'undefined') ? (
            <h1></h1>
            ) : (
                  <h1>{doc}</h1>
                )}
                <small className="text-muted">submitted by {JSON.stringify(commitdata).split(','  )[0]}{'"'}</small>
              </a>
    </div>
  )
}

export default Commit