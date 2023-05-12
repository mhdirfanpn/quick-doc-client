import React from 'react'
import Layout from '../../../components/doctor/layout/Layout'
import Messenger from '../../../components/messenger/Messenger'
const DocMessage = () => {
  return (
    <>
    <Layout>
   <Messenger isUser={false}/>
    </Layout>
    
    </>
  )
}

export default DocMessage