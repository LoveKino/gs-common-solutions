const Koa = require('koa');
const Router = require('koa-router');
const send = require('koa-send');
const Session = require('koa-session');
const log4js = require('log4js');

/**
 * initial web server and middlewares
 */

module.exports = ({
    port,
    assets,
    session_key,
    logLevel = 'debug'
}) => {
    const logger = log4js.getLogger();
    logger.level = logLevel;

    const app = new Koa();
    const router = new Router();

    // replace with you private session secret
    app.keys = [session_key];

    // log entrance
    app.use(async (ctx, next) => {
        ctx.logger = logger;
        ctx.logger.debug(`access: ${ctx.url}`);
        await next();
    });
    app.use(Session({
        key: 'demo_cc'
    }, app));

    // assets directory
    if(assets) {
        router.get('/assets/*', async function (ctx, next) {
          await send(ctx, ctx.path, { root: assets });
        });
    }

    // apis 
    router.get('/api/hello', (ctx, next) => {
        ctx.body = 'hello world';
    });
    app.use(router.routes()).use(router.allowedMethods());

    const server = app.listen(port);
    logger.debug(`start web server at port ${server.address().port}`);

    return {server};
};
