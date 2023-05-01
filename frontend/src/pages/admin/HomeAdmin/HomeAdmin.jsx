import React from "react"

// Importando o Provider
import { PedidosProvider } from "../../../context/PedidosAnalistaContext"

// Importando Componentes
import { SidebarAdmin } from "../../../components/sidebar/SidebarAdmin/SidebarAdmin"

// Importando CSS
import styles from "./HomeAdmin.module.css"
import { UsuariosCadastradosProvider } from "../../../context/UsuariosCadastradosContext"

export const HomeAdmin = () => {
  return (
    <UsuariosCadastradosProvider>
      <div className={styles.main}>
        <SidebarAdmin />   
        <div className={styles.container}>
         
          <h1>Olá Admin</h1>
        
          {/* <Header /> */}
          <div>
            {/* <body/> */}
          </div>
        </div>
      </div>
    </UsuariosCadastradosProvider>
  )
}
