var mysql=require('mysql');
var conn;
exports.connect=function(){
    conn=mysql.createPool({
        connectionLimit:100,
        host:'localhost',
        user:'root',
        password:'1234',
        database:'webdb1'
    });
}

exports.get=function(){
    return conn;
};