import React, { useEffect } from 'react'
import Container from '../components/Container'
import AllPost from '../components/AllPost'
import { useSelector } from 'react-redux'
import auth from '../database/auth/auth'
import { useDispatch } from 'react-redux'
function Home() {
  const authStatus = useSelector((state) => state.auth.auth.status);



  if (authStatus) {
    return (
      <Container>

        <AllPost></AllPost>
      </Container>
    )
  }
  else {
    return (<h1>Login to see posts</h1>)
  }

}

export default Home