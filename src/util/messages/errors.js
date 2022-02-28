const NOT_AUTHORIZATION = { status: 401, message: 'Not Authorization' }
const INSERT_SUCCESS = { message: 'INSERIDO COM SUCESSO' }
const DELETE_SUCCESS = { message: 'DELETADO COM SUCESSO' }
const INSERT_ERROR = { status: 500, message: 'Houve um problema ao tentar inserir' }
const DELETE_ERROR = { status: 500, message: 'Houve um problema ao tentar deletar' }
const UPDATED_SUCCESS = { message: 'UPDATE REALIZADO COM SUCESSO' }


module.exports = { NOT_AUTHORIZATION, INSERT_SUCCESS, DELETE_SUCCESS, INSERT_ERROR, DELETE_ERROR, UPDATED_SUCCESS }
