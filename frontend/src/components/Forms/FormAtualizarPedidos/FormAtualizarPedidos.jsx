import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

// IMPORTANDO COMPONENTES
import { Modal } from "../../Modal/Modal"

// IMPORTANDO ICONES
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

// IMPORTANDO ESTILOS
import styles from "./FormAtualizarPedidos.module.css"

// IMPORTANDO HOOK
import { atualizarPedido } from "../../../hooks/atualizarPedido"
import { buscarFornecedores } from "../../../hooks/buscarFornecedores"
import { buscarProduto } from "../../../hooks/procurarProduto"
import { procurarPedido } from "../../../hooks/procurarPedido"

export const FormAtualizarPedidos = () => {

  //trazendo lista de todos os Fornecedores
  const [fornecedores, setFornecedores] = useState([])
  useEffect(() => {
    async function fetchFornecedores() {
      const dadosFornecedores = await buscarFornecedores()
      setFornecedores(dadosFornecedores)
    }
    fetchFornecedores()
  }, [])

  console.log("fornecedores: ", fornecedores)

  //trazendo lista de todos os Produtos
  const [produtos, setProdutos] = useState([])
  useEffect(() => {
    async function fetchProdutos() {
      const dadosProdutos = await buscarProduto()
      setProdutos(dadosProdutos)
    }
    fetchProdutos()
  }, [])

  console.log("produtos: ", produtos)


  // HANDLES DO MODAL DE CADASTRO
  const handleCloseModalFornecedorCadastrado = () => {
    setOpenModalFornecedorCadastrado(false)
  }

  const handleRedirect = () => {
    navigate("/admin/pedidos")
  }

  // HANDLE SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const data = {
        idProduto,
        idFornecedor,
        nome_motorista,
        placa_veiculo
      }

      const pedido = await atualizarPedido(pedidoId, data)
      setErrorMessage(pedido.message)
      setOpenModalFornecedorCadastrado(true)
    } catch (erro) {
      setErrorMessage(erro.response.data.message)
      setOpenModalFornecedorCadastrado(true)
      alert(errorMessage)
    }
  }

  // NAVIGATE DO REACT ROUTER DOM
  const navigate = useNavigate();

  // STATES DO FORMULÁRIO
  const [idFornecedor, setIdFornecedor] = useState("")
  const [CNPJ, setCNPJ] = useState("")
  const [IE, setIE] = useState("")
  const [razao_social, setRazaoSocial] = useState("")
  const [nome_fornecedor, setNomeFornecedor] = useState("")

  const [idProduto, setIdProduto] = useState("")
  const [nome_produto, setNomeProduto] = useState("")
  const [tipo_produto, setTipoProduto] = useState("")
  const [descricao_produto, setDescricaoProduto] = useState("")
  const [nome_motorista, setNomeMotorista] = useState("")
  const [placa_veiculo, setPlacaVeiculo] = useState("")

  const [documentos_anexos, setDocumentosAnexos] = useState("")
  const [status_fornecedor, setStatusFornecedor] = useState("")

  const { id } = useParams()
  const pedidoId = parseInt(id)

  const [pedido, setPedido] = useState([])

  //buscando pedidos por Id
  useEffect(() => {
    async function fetchProdutos() {
      const dadosProdutos = await procurarPedido(pedidoId)
      console.log("dados do produto: ", dadosProdutos)
      /*       console.log('Informações do Produto que chegam do BackEnd ' + JSON.stringify(dadosProdutos.data.message)) */
      setNomeMotorista(dadosProdutos.nome_motorista)
      setPlacaVeiculo(dadosProdutos.placa_veiculo)
      setIdFornecedor(dadosProdutos.id_fornecedor)
      setIdProduto(dadosProdutos.id_produto)
      setCNPJ(dadosProdutos.fornecedor.CNPJ)
      setIE(dadosProdutos.fornecedor.IE)
      setNomeFornecedor(dadosProdutos.fornecedor.nome_fornecedor)
      setRazaoSocial(dadosProdutos.fornecedor.razao_social)
      setNomeProduto(dadosProdutos.produto.nome_produto)
      setTipoProduto(dadosProdutos.produto.tipo)
      setDescricaoProduto(dadosProdutos.produto.descricao)
    }
    fetchProdutos()
  }, [])

  // MENSAGEM DE ERRO
  const [errorMessage, setErrorMessage] = useState(null)

  const [openModalFornecedorCadastrado, setOpenModalFornecedorCadastrado] = useState(false)

  return (
    <div>
      <div className={styles.external}>
        <div>
          <h1 className={styles.title}>CADASTRO PEDIDOS</h1>
        </div>
        <form className={styles.formCadastroFornecedor} onSubmit={handleSubmit}>
          <div className={styles.leftSide}>
            <div className={styles.upperLeft}>
              <legend className={styles.subTitle}>Dados do Fornecedor</legend>
              <hr />
              {/*               <div>
                <label>
                  ID:
                  <input type="text" className={styles.inputCadastroFornecedor} />
                </label>
                <label>
                  Data:
                  <input type="text" className={styles.inputCadastroFornecedor} />
                </label>
              </div> */}
              <div>
                <label>
                  Id Fornecedor:
                  <select
                    className={styles.inputCadastroFornecedor}
                    value={idFornecedor}
                    onChange={(event) => setIdFornecedor(event.target.value)}
                  >
                    <option value="">Selecione</option>
                    {fornecedores.map((fornecedor) => (
                      <option key={fornecedor.id_fornecedor} value={fornecedor.id_fornecedor}>
                        ({fornecedor.id_fornecedor})
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  CNPJ:
                  <select
                    className={styles.inputCadastroFornecedor}
                    value={CNPJ}
                    onChange={(event) => setCNPJ(event.target.value)}
                  >
                    <option value="">Selecione</option>
                    {fornecedores.map((fornecedor) => (
                      <option key={fornecedor.id} value={fornecedor.CNPJ}>
                        ({fornecedor.CNPJ})
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  IE:
                  <select
                    className={styles.inputCadastroFornecedor}
                    value={IE}
                    onChange={(event) => setIE(event.target.value)}
                  >
                    <option value="">Selecione</option>
                    {fornecedores.map((fornecedor) => (
                      <option key={fornecedor.id} value={fornecedor.IE}>
                        ({fornecedor.IE})
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Razão Social:
                  <select
                    className={styles.inputCadastroFornecedor}
                    value={razao_social}
                    onChange={(event) => setRazaoSocial(event.target.value)}
                  >
                    <option value="">Selecione</option>
                    {fornecedores.map((fornecedor) => (
                      <option key={fornecedor.id} value={fornecedor.razao_social}>
                        ({fornecedor.razao_social})
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Nome Fantasia:
                  <select
                    className={styles.inputCadastroFornecedor}
                    value={nome_fornecedor}
                    onChange={(event) => setNomeFornecedor(event.target.value)}
                  >
                    <option value="">Selecione</option>
                    {fornecedores.map((fornecedor) => (
                      <option key={fornecedor.id} value={fornecedor.nome_fornecedor}>
                        ({fornecedor.nome_fornecedor})
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.upperRight}>
              <legend className={styles.subTitle}>Dados do Produto</legend>
              <hr />
              <div>
                <label>
                  Id Produto:
                  <select
                    className={styles.inputCadastroFornecedor}
                    value={idProduto}
                    onChange={(event) => setIdProduto(event.target.value)}
                  >
                    <option value="">Selecione</option>
                    {produtos.map((produto) => (
                      <option key={produto.id_produto} value={produto.id_produto}>
                        ({produto.id_produto})
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Nome do Produto:
                  <select
                    className={styles.inputCadastroFornecedor}
                    value={nome_produto}
                    onChange={(event) => setNomeProduto(event.target.value)}
                  >
                    <option value="">Selecione</option>
                    {produtos.map((produto) => (
                      <option key={produto.id} value={produto.nome_produto}>
                        ({produto.nome_produto})
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Tipo:
                  <select
                    className={styles.inputCadastroFornecedor}
                    value={tipo_produto}
                    onChange={(event) => setTipoProduto(event.target.value)}
                  >
                    <option value="">Selecione</option>
                    {produtos.map((produto) => (
                      <option key={produto.id} value={produto.tipo}>
                        ({produto.tipo})
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Descrição:
                  <select
                    className={styles.inputCadastroFornecedor}
                    value={descricao_produto}
                    onChange={(event) => setDescricaoProduto(event.target.value)}
                  >
                    <option value="">Selecione</option>
                    {produtos.map((produto) => (
                      <option key={produto.id} value={produto.descricao}>
                        ({produto.descricao})
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <label>
                  <h3>Nome do Caminhoneiro:</h3>
                  <div>
                    <input
                      className={styles.customSelect}
                      type="text"
                      name="textoNomeEntregador"
                      value={nome_motorista}
                      onChange={(event) => setNomeMotorista(event.target.value)}
                    />
                  </div>
                </label>
              </div>
              <div className={styles.inputBlock}>
                <label htmlFor="textoPlacaVeiculo">
                  <h3>Placa do Caminhão:</h3>
                  <input
                    className={styles.customSelect}
                    type="text"
                    name="textoPlacaVeiculo"
                    value={placa_veiculo}
                    onChange={(event) => setPlacaVeiculo(event.target.value)}
                  />
                </label>
              </div>
              <div>
                <input
                  type="button"
                  className={styles.botaoConfirmarModal}
                  onClick={handleSubmit}
                  value="CADASTRAR"
                />
              </div>

              {errorMessage === "Fornecedor cadastrado com sucesso!" ? (
                /* MODAL CADASTRO COM SUCESSO */
                <Modal isOpen={openModalFornecedorCadastrado} onClick={handleRedirect}>
                  <div className={styles.conteudoModal}>
                    <FontAwesomeIcon icon={faCircleCheck} className={styles.iconeModal} />
                    <p>{errorMessage}</p>
                    <Link to="/admin/fornecedores">
                      <input className={styles.botaoConfirmarModal} type="button" value="OK" />
                    </Link>
                  </div>
                </Modal>
              ) : (
                /* MODAL CADASTRO COM INPUT FALTANDO */
                <Modal isOpen={openModalFornecedorCadastrado} onClick={handleCloseModalFornecedorCadastrado}>
                  <div className={styles.conteudoModal}>
                    <FontAwesomeIcon icon={faCircleCheck} className={styles.iconeModal} />
                    <p>{errorMessage}</p>
                    <input
                      className={styles.botaoConfirmarModal}
                      type="button"
                      value="OK"
                      onClick={handleCloseModalFornecedorCadastrado}
                    />
                  </div>
                </Modal>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}