import React from "react"

// Importando o Provider
import { UsuariosCadastradosProvider } from "../../../context/UsuariosCadastradosContext"

// Importando Componentes
import { SidebarAdmin } from "../../../components/sidebar/SidebarAdmin/SidebarAdmin"
import { HeaderUsuarios } from "../../../components/header/HeaderAdmin/HeaderUsuarios/HeaderUsuarios"

// Importando CSS
import styles from "./UsuariosAdmin.module.css"

export const UsuariosAdmin = () => {
  return (
    <UsuariosCadastradosProvider>
      <div id={styles["main"]}>
        <div id={styles["sidebar"]}><SidebarAdmin /></div>
        <div id={styles["header"]}><HeaderUsuarios /></div>
        <div id={styles["barraPesquisa"]}>Barra Pesquisa</div>
        <div id={styles["body"]}>
        {/*  < Body /> */}  
        </div>          
      </div>
    </UsuariosCadastradosProvider>
  )
}