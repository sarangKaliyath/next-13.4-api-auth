import Image from 'next/image'
import styles from './page.module.css'
import Header from './component/header/header'

export default function Home() {
  
  return (
    <div style={{left:'0px'}}>
      <Header/>
      <h4>Home</h4>
    </div>
  )
}
