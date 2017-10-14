const Koa = require('koa');
const koaRouter = require('koa-router');
const fs = require('fs')

const app = new Koa();
const router = koaRouter();

app.use(router['routes']());

router.get('/', function (ctx, next) {
        ctx.body = 'Hello xrkLession!';
});
router.get('/xrkapi/lession/list', function (ctx, next) {
        var fileData = fs.readFileSync("lession.json").toString()

        console.log(fileData)
        if (!fileData)fileData = '[]'

        ctx.body = fileData;
});
router.get('/xrkapi/lession/add', function (ctx, next) {
        var params = ctx.query
        var lession = {'id':'' + Date.now(),'name':params.name,'start':params.start,'end':params.end,'week':params.week}
        console.log(lession)

        var fileData = fs.readFileSync("lession.json").toString()
        if (!fileData)fileData = '[]'
        var json = JSON.parse(fileData)
        json.push(lession);

        fs.writeFileSync("lession.json",JSON.stringify(json))

        ctx.body = {status:'ok'};
});




router.get('/xrkapi/lession/edit', function (ctx, next) {
        var params = ctx.query
        console.log(params)

        var fileData = fs.readFileSync("lession.json").toString()
        if (!fileData)fileData = '[]'
        var json = JSON.parse(fileData)
        for (var i in json){
                if (json[i].id == params.id){
                        for (var k in json[i]){
                                params[k] && (json[i][k] = params[k])
                        }
                }
        }

        fs.writeFileSync("lession.json",JSON.stringify(json))

        ctx.body = {status:'ok'};
});

app.listen(3000, ()=>console.log('Koa start at 3000...'));