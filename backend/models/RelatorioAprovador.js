const { DataTypes } = require('sequelize')
const db = require('../db/conexao')
const Usuario = require('./Usuario')
const Pedido = require("./Produto")

const RelatorioAprovador = db.define('RelatorioAprovador', {
    id_relatorio_aprovador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    doc_status: {
        type: DataTypes.BOOLEAN,
        required: true
    },

    info_recebedor_status: {
        type: DataTypes.BOOLEAN,
        required: true
    },

    info_analista_status: {
        type: DataTypes.BOOLEAN,
        required: true
    },

    revisao_aprovador: {
        type: DataTypes.STRING,
        required: false,
        allowNull: false
    },

    status_final_aprovacao: {
        type: DataTypes.BOOLEAN,
        required: true,
        allowNull: true
    }
})

//Criando relação entre tabela RelatorioAprovador e Usuario
RelatorioAprovador.belongsTo(Usuario,{foreignKey: 'id_usuario'})
RelatorioAprovador.belongsTo(Pedido,{foreignKey: 'id_pedido'})
//Usuario.hasMany(RelatorioAprovador) // vinculo com a tabela usuarios tambem (Gabriel)

module.exports = RelatorioAprovador