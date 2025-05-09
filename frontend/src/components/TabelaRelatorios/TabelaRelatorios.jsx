import { React, useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboardList } from "@fortawesome/free-solid-svg-icons"

import styles from "../TabelaRelatorios/TabelaRelatorios.module.css"

import { RelatoriosAprovadorContext } from "../../context/RelatoriosAprovadorContext"
import { buscarRelatoriosAnalista } from "../../hooks/buscarRelatorios"

// TABELA REFERENTE AO APROVADOR <-------------


export const TabelaRelatorios = () => {
  const dados = useContext(RelatoriosAprovadorContext)

  const listaRelatorios = dados[0]

  const [relatoriosAnalista, setRelatoriosAnalista] = useState([])
  useEffect(() => {
    async function fetchRelatoriosAnalista() {
      const dadosPedidos = await buscarRelatoriosAnalista()
      setRelatoriosAnalista(dadosPedidos)
    }
    fetchRelatoriosAnalista()
  }, [])

console.log('Relatorios Analista' , relatoriosAnalista)

  return (
    <div className={styles.table}>
      <div className={styles.title}>
        <h1>Relatórios Pendentes</h1>
      </div>

      <table className={styles.tableBackground}>
        <thead>
          <tr>
            <th>Nº Pedido</th>
            <th>Descrição</th>
            <th>Estado de Aprovação</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {relatoriosAnalista?.data?.map((relatorio) => (
            <tr key={relatorio.id_relatorio_analista}>
              <td className={styles.tableData}>{relatorio.id_relatorio_analista}</td>
              <td className={styles.tableData}>{relatorio.pedido.produto.descricao}</td>
              <td className={styles.tableData}>{relatorio.status_aprovacao} </td>
              <td className={styles.tableData}>{relatorio.pedido.produto.data_entrada_empresa}</td>
              <td className={styles.tableData}>
              {relatorio.status_aprovacao === 'Pendente' ? (
                <button className={styles.button}>
                  <Link to={`/aprovador/relatorio/${relatorio.id_relatorio_analista}`}>
                    Analisar <FontAwesomeIcon icon={faClipboardList} />
                  </Link>
                </button>
                ) : (
                  <button className={styles.button}>
                    <Link to={`/aprovador/home`}>
                      Visualizar <FontAwesomeIcon icon={faClipboardList} />
                    </Link>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}