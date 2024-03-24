'use client'
import React, { useEffect, useState } from 'react'
import {page as PatientData } from '@/app/components/getData'

const page = () => {
  const [state, setState] = useState<any>()

  useEffect(() => {
    (async () => {
      const res = await PatientData();
      const data = JSON.stringify(res)
      setState(data)
    }) ();
  }, [])

  return (
    <div>{state}</div>
  )
}

export default page