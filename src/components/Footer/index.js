import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer(){
  return(
      <footer className={styles.footer}>
        <Link to='/'><img src="logoLeoFlix.png" width="100" alt="logo leo flix" /></Link>
        <div>
          <p>Desenvolvido por <a href="https://linkedin.com/in/lsantanaa">LSDev</a> &copy;2023 Alguns direitos reservados</p>
        </div>
      </footer>
    )
}

export default Footer;