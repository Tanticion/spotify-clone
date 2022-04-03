import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Dashboard from '../components/Dashboard'

export default function Home() {
  const [code, setCode] = useState("")
  useEffect(() => {
    const innerCode = new URLSearchParams(window.location.search).get('code')
    setCode(innerCode)


  },[])
  return code ? <Dashboard code={code}/> : <a href="/login">Relogin</a>
}
