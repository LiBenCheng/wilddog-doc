var express = require('express'),
    path = require('path'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    crypto = require('crypto'),
    querystring = require('querystring'),
    fs = require('fs'),
    marked = require('./marked'),
    moment = require('moment'),
    raneto = require('./raneto'),
    config = require('./config'),
    toc = require('./markdown-toc'),
    pinyin = require("pinyin"),
    app = express(); // 使用nodejs express

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');
app.set('view engine', 'html'); // 设置引擎为html
app.enable('view cache');
app.engine('html', require('hogan-express'));

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/bower_components", express.static(path.join(__dirname, 'bower_components')));

/**
 * 对所有路径进行解析.
 */
app.all("*", function (req, res, next) {
    var queryStr = null;
    var sso = null;
    var sig = null;
    var secret = "d836444a9e4084d5b222a60c208dce14";
    if (req.query.sso) {
        sso = req.query.sso;
        sig = req.query.sig;

    } else {
        sso = req.cookies['sso']
        sig = req.cookies['sig']
    };
    if (sso != null && sso != '') {
        var computedSignature = crypto.createHmac("sha256", secret).update(sso).digest("hex");
        if (computedSignature == sig) {
            queryString = new Buffer(sso, "base64").toString();
            res.cookie("sso", sso, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 0.5),
                httpOnly: true
            });
            res.cookie("sig", sig, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 0.5),
                httpOnly: true
            });
            var user = querystring.parse(queryString);
            var hash = crypto.createHash('md5').update(user.email).digest("hex");
            res.locals.user = {
                email: user.email,
                avatar24: "https://cdn.wilddog.com/gravatar/" + hash + "?s=24&d=https://cdn.wilddog.com/images/default-header.png"
            }
        }
        //if hmacSha256(sso) == sig
        //queryStri= base64decode(sso) querystring is like  "nonce=" + nonce + "&name=" + userName + "&username=" + userName + "&email=" + email + "&external_id=" + userId;
        //setcookie sso
        //setcookie sig
    } else {
        var inSso = new Buffer('return_sso_url=https://z.wilddog.com').toString('base64');
        var inSig = crypto.createHmac("sha256", secret).update(inSso).digest("hex");
        res.locals.returnUrl = "?sso=" + inSso + "&sig=" + inSig;
    }
    next();
});

app.all('*', function (req, res, next) {
    if (req.query.search) {
        var searchResults = [];

        raneto.search(req.query.search).forEach(function (result) {
            searchResults.push(raneto.getPage(__dirname + '/content/' + result.ref, config));
        });

        var pageListSearch = raneto.getPages('', config);
        return res.render('search', {
            config: config,
            pages: pageListSearch,
            search: req.query.search,
            searchResults: searchResults,
            partials: {
                header_commen: 'header_commen',
            },
            body_class: 'page-search',
            // layout: 'search_layout'
            layout: 'layout'
        });
    } else if (req.params[0]) {
        var slug = req.params[0];
        if (slug == '/') slug = '/index'; //如果是首页,那么转向/index
        var filePath = __dirname + '/content' + slug + '.md';
        var pageList = raneto.getPages(slug, config);


        if (slug == '/index' && !fs.existsSync(filePath)) {
            return res.render('home', {
                config: config,
                pages: pageList,
                partials: {
                    header_commen: 'header_commen',
                },
                //                body_class: 'page-home',
                layout: 'index_layout'
            });
        } else if (slug == '/video' && !fs.existsSync(filePath)) {
            return res.render('video', {
                config: config,
                pages: pageList,
                partials: {
                    header_commen: 'header_commen',
                },
                //                body_class: 'page-home',
                layout: 'video'
            });
        } else if (slug == '/questions' && !fs.existsSync(filePath)) {
            return res.render('questions', {
                config: config,
                pages: pageList,
                partials: {
                    header_commen: 'header_commen',
                },
                //                body_class: 'page-home',
                layout: 'questions'
            });
        } else if (slug == '/outmen' && !fs.existsSync(filePath)) {
            return res.render('outmen', {
                config: {},
                pages: {},
                body_class: '',
                layout: ''
            });
        } else if (slug == '/logout') {
            res.clearCookie('sso');
            res.clearCookie('sig');
            res.redirect('/');
        } else {
            fs.readFile(filePath, 'utf8', function (err, content) {
                if (err) {
                    err.status = '404';
                    err.message = 'Whoops. Looks like this page doesn\'t exist.';
                    return next(err);
                }

                // File info
                var stat = fs.lstatSync(filePath);
                // Meta
                var meta = raneto.processMeta(content);

                content = raneto.stripMeta(content);
                // Content
                content = raneto.processVars(content, config);
                var html = marked(content);
                var counter = {};
                var _toc = toc(content, {
                    maxdepth: 3,
                    slugify: function (raw) {
                        var pyText = pinyin(raw, {
                            style: pinyin.STYLE_NORMAL
                        }).join("-").replace(/[^\w]+/g, '-')
                        if (counter[pyText] != null) {
                            counter[pyText] += 1;
                        } else {
                            counter[pyText] = 0;
                        }
                        return pyText + counter[pyText]
                    }
                });
                var _tocHtml = marked(_toc.content);
                var tmpl = "page";
                if (meta["tmpl"]) {
                    tmpl = meta["tmpl"];
                }
                return res.render(tmpl, {
                    config: config,
                    toc: _tocHtml,
                    pages: pageList,
                    meta: meta,
                    content: html,
                    partials: {
                        header_commen: 'header_commen',
                    },
                    body_class: 'page-' + raneto.cleanString(slug.replace(/\//g, ' ')),
                    last_modified: moment(stat.mtime).format('YYYY/MM/DD')
                });
            });
        }
    } else {
        next();
    }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            config: config,
            status: err.status,
            message: err.message,
            error: err,
            body_class: 'page-error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        config: config,
        status: err.status,
        message: err.message,
        error: {},
        body_class: 'page-error'
    });
});


module.exports = app;