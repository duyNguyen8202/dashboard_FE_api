'use client'
import { Box } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
const layout = ({children}:{children:ReactNode}) => {
  return (

        <Box>{children}</Box>
   
  )
}

export default layout