import React from 'react'

function Contributor({contributor}) {
  return (
    <div>
    <a href="#" className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-between">
              {/* <small className="text-muted">{JSON.stringify(contributor.login)}</small> */}
            </div>
            {(typeof contributor.login === 'undefined') ? (
            <h1></h1>
            ) : (
            <p className="mb-1">{JSON.stringify(contributor.login).substring(1, JSON.stringify(contributor.login).length-1)}</p>
                )}
            <div><small className="text-muted">Type: {contributor.type}</small></div>
            {/* <div><small className="text-muted">Type: {contributor.}</small></div> */}
            {/* <small className="text-muted">submitted by {JSON.stringify(commitdata).split(',')[0]}{'"'}</small> */}
          </a>
</div>
  )
}

export default Contributor