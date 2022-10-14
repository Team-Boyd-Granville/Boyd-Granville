import React from 'react'

function Issue({commitdata}) {
  return (
    <div>
             <a href="#" className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{commitdata.title}</h5>
              {/* <small className="text-muted">4 days ago</small> */}
            </div>
            <p className="mb-1">status: {commitdata.state}</p>
            <div><small className="text-muted">number of comments: {commitdata.comments}</small></div>
            <small className="text-muted">submitted by {'"'}{commitdata.user}{'"'}</small>
          </a>
    </div>
  )
}

export default Issue