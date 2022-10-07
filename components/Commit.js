/* eslint-disable react/no-unescaped-entities */
import React from 'react'

function Commit({commitdata, index}) {
  return (
    <div>
        <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">commit {index+1}</h5>
                  <small className="text-muted">{JSON.stringify(commitdata).split(',')[1]}</small>
                </div>
                <p className="mb-1">{JSON.stringify(commitdata).split(',')[2]}</p>
                <div><small className="text-muted">repository name</small></div>
                <small className="text-muted">submitted by {JSON.stringify(commitdata).split(',')[0]}"</small>
              </a>
    </div>
  )
}

export default Commit