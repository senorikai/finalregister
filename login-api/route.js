
module.exports = function(app){
    const rethink = require("rethinkdb");
    let connection = null;

    rethink.connect( {host: 'localhost', port: 28015,db:'ReactExpress'}, function(err, conn) {
        if (err) throw err;
       connection = conn;
    })

    // CHECK IF SERVER IS RUNNING
    app.get("/", (req, res) => {
        if(connection!=null){
            rethink.db('ReactExpress').tableList().run(connection,(err,result)=>{
                if(!result.includes('users')){
                    rethink.db('ReactExpress').tableCreate('users').run(connection);
                }
            });
            res.json({Type:'Success',Message:'Server is ready'})
        }else{
            res.json({Type:'Error',Message:"Server is not ready"});
        }
    });


    // GET ALL USERS
    app.get('/users',(req,res)=>{
        rethink.table('users').run(connection,(err,cursor)=>{
            if(err){
                res.json({Type:'Error',Message:"Error in Fetching Users Table"})
            }
            cursor.toArray(function(err, result) {
                if (err) res.json({Type:'Error',Message:"Internal Server Error"});
                res.json({Type:'Success',Payload:result})
            });
        })
    });

    // GET A USER
    app.get('/users/:id',(req,res)=>{
        rethink.table('users').get(req.params.id).run(connection,(err,result)=>{
            if (err) res.json({Type:'Error',Message:"Internal Server Error"});
            res.json({Type:'Success',Payload:result})
        })
    })

    // LOGIN USER
    app.post('/login',(req,res)=>{
        rethink.table('users')
        .filter(rethink.row('username').eq(req.body.username))
        .filter(rethink.row('password').eq(req.body.password))
        .run(connection,(err,cursor)=>{
            cursor.toArray(function(err, result) {
                if (err) res.json({Type:'Error',Message:"Internal Server Error"});
                if(result.length>0){
                    res.json({Type:'Success',Message:'Successfully Loggedin'});
                }else{
                    res.json({Type:'Error',Message:'Credentials not found!'});
                }
            });
        
        })
    })

    // REGISTER USER
    app.post('/register',(req,res)=>{
        rethink.table('users')
        .filter(rethink.row('username').eq(req.body.username))
        .run(connection,(err,cursor)=>{
            cursor.toArray(function(err, result) {
                if (err) res.json({Type:'Error',Message:"Internal Server Error"});
                if(result.length>0){
                    res.json({Type:'Error',Message:'Username already exists'});
                }else{
                    rethink.table('users').insert({
                        username:req.body.username,
                        password:req.body.password}).run(connection,(err,result)=>{
                            if (err) res.json({Type:'Error',Message:"Internal Server Error"});
                            if(result) res.json({Type:'Success',Payload:result})
                        })
                }
            });
        
        })
    })

}