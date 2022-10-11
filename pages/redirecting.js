/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { getUser } from './api/apiService';
import { useState, useEffect } from 'react';

function redirecting() {
    const { data: session, status } = useSession();
  const router = useRouter();

    useEffect(() => {
        const checkUserExists = () => {
          getUser(session.user.name)
              .then(resp => {
                console.log(resp);
                if (resp !== "") {
                  router.push('/home');
    
                } else {
                    router.push('/preferences');
                }
            })
            .catch(error => {
                alert("Error getting repos, see log");
                console.log(error);
            });
      };
      if (session !== undefined) {
        checkUserExists();
    }
    }, [router, session]);
  return (
    <div>Loading...</div>
  )
}

export default redirecting