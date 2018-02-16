var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Koa = require('koa');
const Router = require('koa-router');
const send = require('koa-send');
const Session = require('koa-session');
const log4js = require('log4js');
/**
 * initial web server and middlewares
 */
module.exports = ({ port, assets, session_key, logLevel = 'debug' }) => {
    const logger = log4js.getLogger();
    logger.level = logLevel;
    const app = new Koa();
    const router = new Router();
    // replace with you private session secret
    app.keys = [session_key];
    // log entrance
    app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
        ctx.logger = logger;
        ctx.logger.debug(`access: ${ctx.url}`);
        yield next();
    }));
    app.use(Session({
        key: 'demo_cc'
    }, app));
    // assets directory
    if (assets) {
        router.get('/assets/*', function (ctx, next) {
            return __awaiter(this, void 0, void 0, function* () {
                yield send(ctx, ctx.path, { root: assets });
            });
        });
    }
    // apis 
    router.get('/api/hello', (ctx, next) => {
        ctx.body = 'hello world';
    });
    app.use(router.routes()).use(router.allowedMethods());
    const server = app.listen(port);
    logger.debug(`start web server at port ${server.address().port}`);
    return { server };
};
//# sourceMappingURL=app.js.map