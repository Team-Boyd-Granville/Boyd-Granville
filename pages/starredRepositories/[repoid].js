/* eslint-disable react/jsx-key */
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Commit from '../../components/Commit';
import Issue from '../../components/Issue';
import Layout from "../../components/Layout"
import { getAllRepoInfo } from './../api/apiService';

function StarredRepositories() {
  const router = useRouter()
  const { repoid } = router.query
  const [repoInfo, setrepoInfo] = useState([]);
  const getAllInfo = () => {
    getAllRepoInfo("mtytel", "helm")
    .then(resp => {
      console.log(resp);
        setrepoInfo(resp);
        })
        .catch(error => {
            alert("Error getting starred repos, see log");
            console.log(error);
          });
        };

useEffect(() => {
  getAllInfo();
    }, []);
    
  return (
    <div>
      
        
<div className="container mb-5">
            <div className="list-group">
              <a className="list-group-item list-group-item-action active list-group-item-danger" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-1">Important logged issues</h6>
                </div>
              </a>
              {/* <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">issue 1</h5>
                  <small className="text-muted">4 days ago</small>
                </div>
                <p className="mb-1">issue description</p>
                <div><small className="text-muted">repository name</small></div>
                <small className="text-muted">submitted by "user"</small>
              </a> */}

{(typeof repoInfo === 'undefined') ? (
          <h1></h1>
      ) : (
        repoInfo.slice(9,12).map((commitdata, index) => (

          // <h1>{JSON.stringify(commitdata.commit)}</h1>
          <Issue commitdata={commitdata} index={index}/>
        ))
        )}
          
            </div>
          </div>
    

          <div className="container mb-5">
            <div className="list-group">
              <a className="list-group-item list-group-item-action active list-group-item-danger" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-1">Important Commit Summaries</h6>
                </div>
              </a>

    {/* <h1>{repoInfo[6]}</h1> */}
      {(typeof repoInfo === 'undefined') ? (
          <h1></h1>
      ) : (
        repoInfo.slice(5,8).map((commitdata, index) => (
          // <h1>{JSON.stringify(commitdata.commit)}</h1>
              <Commit commitdata={commitdata} index={index}/>
        ))
        )}
            </div>
          </div>
    
          {/* <div className="container mb-5">
            <div className="list-group">
              <a className="list-group-item list-group-item-action active list-group-item-danger" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-1">Documentation Updates</h6>
                </div>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">update 1</h5>
                  <small className="text-muted">4 days ago</small>
                </div>
                <p className="mb-1">update description</p>
                <div><small className="text-muted">repository name</small></div>
                <small className="text-muted">submitted by "user"</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">update 2</h5>
                  <small className="text-muted">4 days ago</small>
                </div>
                <p className="mb-1">commit description</p>
                <div><small className="text-muted">update name</small></div>
                <small className="text-muted">submitted by "user"</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">update 3</h5>
                  <small className="text-muted">4 days ago</small>
                </div>
                <p className="mb-1">update description</p>
                <div><small className="text-muted">repository name</small></div>
                <small className="text-muted">submitted by "user"</small>
              </a>
            </div>
          </div> */}
          
{/* 
          <div className="container mb-5">
            <div className="list-group">
              <a className="list-group-item list-group-item-action active list-group-item-primary" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-1">Featured Team Members</h6>
                </div>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Team Member 1</h5>
                </div>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Team Member 2</h5>
                </div>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Team Member 3</h5>
                </div>
              </a>
            </div>
          </div> */}
    </div>
  )
}

StarredRepositories.getLayout = function getLayout(StarredRepositories) {
  return (
      <Layout>{StarredRepositories}</Layout>
  )
}
export default StarredRepositories