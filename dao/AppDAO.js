var redis = require('../libraries/Redis');

var AppDAO = {

   add_carrinho: function (data, callback) {
        var id = data.id;
        var extract = {
            id: id,
            nome: data.nome,
            preco: data.preco, 
            quantidade: data.quantidade
        };

        redis.add_set({key: {"id": id}, data: extract}, function (resp) {
            if (resp){
                return callback({err: false, response: "Dados adicionados com sucesso", id },  200);
            }else{
                return callback({err: true, response: "Produto não foi adicionado"}, 400);
            }
        })
    },

    get_carrinho: function (data, callback) {
        redis.get_set({"id": data.id}, null, function (resp) {
            if (resp){
                return callback({err: false, response: "Carrinho achado com sucesso", data: resp}, 200);
            }else{
                return callback({err: true, response: "Carrinho não foi achado", data: null}, 404);
            }
        })

    },

    update_carrinho: function (id, data, callback) {
        redis.add_set({key: {"id": id}, data: data}, function (resp) {
            if (resp){
                return callback({err: false, response: "Carrinho foi atualizado com sucesso"}, 200);
            }else{
                return callback({err: true, response: "Carrinho não foi achado com sucesso"}, 400);
            }
        })
    },

    deletar_carrinho: function (data, callback) {
        redis.delete_set({"id": data.id}, function (resp) {
            if (resp){
                return callback({err: false, response: "Carrinho foi deletado com sucesso"}, 200);
            }else{
                return callback({err: true, response: "Nenhum carrinho com esse id"}, 404);
            }
        })

    }

};

module.exports = AppDAO;