// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,

  theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
  transition: Reveal.getQueryHash().transition || "default", // default/cube/page/concave/zoom/linear/fade/none

  // Parallax scrolling
  parallaxBackgroundImage:
    "https://static.whirlocal.io/uploads/2020/01/presentations-bg.jpg",
  parallaxBackgroundSize: "1920 720px",

  // Optional libraries used to extend on reveal.js
  dependencies: [
    {
      src: "lib/js/classList.js",
      condition: function () {
        return !document.body.classList;
      },
    },
    {
      src: "plugin/markdown/marked.js",
      condition: function () {
        return !!document.querySelector("[data-markdown]");
      },
    },
    {
      src: "plugin/markdown/markdown.js",
      condition: function () {
        return !!document.querySelector("[data-markdown]");
      },
    },
    {
      src: "plugin/highlight/highlight.js",
      async: true,
      callback: function () {
        hljs.initHighlightingOnLoad();
      },
    },
    {
      src: "plugin/zoom-js/zoom.js",
      async: true,
      condition: function () {
        return !!document.body.classList;
      },
    },
    {
      src: "plugin/notes/notes.js",
      async: true,
      condition: function () {
        return !!document.body.classList;
      },
    },
  ],
});

/* http://prismjs.com/download.html?themes=prism-okaidia&languages=css+clike+php */
var _self =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function () {
    var e = /\blang(?:uage)?-(\w+)\b/i,
      t = 0,
      n = (_self.Prism = {
        util: {
          encode: function (e) {
            return e instanceof a
              ? new a(e.type, n.util.encode(e.content), e.alias)
              : "Array" === n.util.type(e)
              ? e.map(n.util.encode)
              : e
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function (e) {
            return Object.prototype.toString
              .call(e)
              .match(/\[object (\w+)\]/)[1];
          },
          objId: function (e) {
            return (
              e.__id || Object.defineProperty(e, "__id", { value: ++t }), e.__id
            );
          },
          clone: function (e) {
            var t = n.util.type(e);
            switch (t) {
              case "Object":
                var a = {};
                for (var r in e)
                  e.hasOwnProperty(r) && (a[r] = n.util.clone(e[r]));
                return a;
              case "Array":
                return (
                  e.map &&
                  e.map(function (e) {
                    return n.util.clone(e);
                  })
                );
            }
            return e;
          },
        },
        languages: {
          extend: function (e, t) {
            var a = n.util.clone(n.languages[e]);
            for (var r in t) a[r] = t[r];
            return a;
          },
          insertBefore: function (e, t, a, r) {
            r = r || n.languages;
            var i = r[e];
            if (2 == arguments.length) {
              a = arguments[1];
              for (var l in a) a.hasOwnProperty(l) && (i[l] = a[l]);
              return i;
            }
            var o = {};
            for (var s in i)
              if (i.hasOwnProperty(s)) {
                if (s == t)
                  for (var l in a) a.hasOwnProperty(l) && (o[l] = a[l]);
                o[s] = i[s];
              }
            return (
              n.languages.DFS(n.languages, function (t, n) {
                n === r[e] && t != e && (this[t] = o);
              }),
              (r[e] = o)
            );
          },
          DFS: function (e, t, a, r) {
            r = r || {};
            for (var i in e)
              e.hasOwnProperty(i) &&
                (t.call(e, i, e[i], a || i),
                "Object" !== n.util.type(e[i]) || r[n.util.objId(e[i])]
                  ? "Array" !== n.util.type(e[i]) ||
                    r[n.util.objId(e[i])] ||
                    ((r[n.util.objId(e[i])] = !0),
                    n.languages.DFS(e[i], t, i, r))
                  : ((r[n.util.objId(e[i])] = !0),
                    n.languages.DFS(e[i], t, null, r)));
          },
        },
        plugins: {},
        highlightAll: function (e, t) {
          var a = {
            callback: t,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          n.hooks.run("before-highlightall", a);
          for (
            var r,
              i = a.elements || document.querySelectorAll(a.selector),
              l = 0;
            (r = i[l++]);

          )
            n.highlightElement(r, e === !0, a.callback);
        },
        highlightElement: function (t, a, r) {
          for (var i, l, o = t; o && !e.test(o.className); ) o = o.parentNode;
          o &&
            ((i = (o.className.match(e) || [, ""])[1].toLowerCase()),
            (l = n.languages[i])),
            (t.className =
              t.className.replace(e, "").replace(/\s+/g, " ") +
              " language-" +
              i),
            (o = t.parentNode),
            /pre/i.test(o.nodeName) &&
              (o.className =
                o.className.replace(e, "").replace(/\s+/g, " ") +
                " language-" +
                i);
          var s = t.textContent,
            u = { element: t, language: i, grammar: l, code: s };
          if ((n.hooks.run("before-sanity-check", u), !u.code || !u.grammar))
            return (
              u.code && (u.element.textContent = u.code),
              n.hooks.run("complete", u),
              void 0
            );
          if ((n.hooks.run("before-highlight", u), a && _self.Worker)) {
            var g = new Worker(n.filename);
            (g.onmessage = function (e) {
              (u.highlightedCode = e.data),
                n.hooks.run("before-insert", u),
                (u.element.innerHTML = u.highlightedCode),
                r && r.call(u.element),
                n.hooks.run("after-highlight", u),
                n.hooks.run("complete", u);
            }),
              g.postMessage(
                JSON.stringify({
                  language: u.language,
                  code: u.code,
                  immediateClose: !0,
                })
              );
          } else
            (u.highlightedCode = n.highlight(u.code, u.grammar, u.language)),
              n.hooks.run("before-insert", u),
              (u.element.innerHTML = u.highlightedCode),
              r && r.call(t),
              n.hooks.run("after-highlight", u),
              n.hooks.run("complete", u);
        },
        highlight: function (e, t, r) {
          var i = n.tokenize(e, t);
          return a.stringify(n.util.encode(i), r);
        },
        tokenize: function (e, t) {
          var a = n.Token,
            r = [e],
            i = t.rest;
          if (i) {
            for (var l in i) t[l] = i[l];
            delete t.rest;
          }
          e: for (var l in t)
            if (t.hasOwnProperty(l) && t[l]) {
              var o = t[l];
              o = "Array" === n.util.type(o) ? o : [o];
              for (var s = 0; s < o.length; ++s) {
                var u = o[s],
                  g = u.inside,
                  c = !!u.lookbehind,
                  h = !!u.greedy,
                  f = 0,
                  d = u.alias;
                if (h && !u.pattern.global) {
                  var p = u.pattern.toString().match(/[imuy]*$/)[0];
                  u.pattern = RegExp(u.pattern.source, p + "g");
                }
                u = u.pattern || u;
                for (var m = 0, y = 0; m < r.length; y += r[m].length, ++m) {
                  var v = r[m];
                  if (r.length > e.length) break e;
                  if (!(v instanceof a)) {
                    u.lastIndex = 0;
                    var b = u.exec(v),
                      k = 1;
                    if (!b && h && m != r.length - 1) {
                      if (((u.lastIndex = y), (b = u.exec(e)), !b)) break;
                      for (
                        var w = b.index + (c ? b[1].length : 0),
                          _ = b.index + b[0].length,
                          A = m,
                          P = y,
                          j = r.length;
                        j > A && _ > P;
                        ++A
                      )
                        (P += r[A].length), w >= P && (++m, (y = P));
                      if (r[m] instanceof a || r[A - 1].greedy) continue;
                      (k = A - m), (v = e.slice(y, P)), (b.index -= y);
                    }
                    if (b) {
                      c && (f = b[1].length);
                      var w = b.index + f,
                        b = b[0].slice(f),
                        _ = w + b.length,
                        x = v.slice(0, w),
                        O = v.slice(_),
                        S = [m, k];
                      x && S.push(x);
                      var N = new a(l, g ? n.tokenize(b, g) : b, d, b, h);
                      S.push(N),
                        O && S.push(O),
                        Array.prototype.splice.apply(r, S);
                    }
                  }
                }
              }
            }
          return r;
        },
        hooks: {
          all: {},
          add: function (e, t) {
            var a = n.hooks.all;
            (a[e] = a[e] || []), a[e].push(t);
          },
          run: function (e, t) {
            var a = n.hooks.all[e];
            if (a && a.length) for (var r, i = 0; (r = a[i++]); ) r(t);
          },
        },
      }),
      a = (n.Token = function (e, t, n, a, r) {
        (this.type = e),
          (this.content = t),
          (this.alias = n),
          (this.length = 0 | (a || "").length),
          (this.greedy = !!r);
      });
    if (
      ((a.stringify = function (e, t, r) {
        if ("string" == typeof e) return e;
        if ("Array" === n.util.type(e))
          return e
            .map(function (n) {
              return a.stringify(n, t, e);
            })
            .join("");
        var i = {
          type: e.type,
          content: a.stringify(e.content, t, r),
          tag: "span",
          classes: ["token", e.type],
          attributes: {},
          language: t,
          parent: r,
        };
        if (
          ("comment" == i.type && (i.attributes.spellcheck = "true"), e.alias)
        ) {
          var l = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
          Array.prototype.push.apply(i.classes, l);
        }
        n.hooks.run("wrap", i);
        var o = Object.keys(i.attributes)
          .map(function (e) {
            return (
              e + '="' + (i.attributes[e] || "").replace(/"/g, "&quot;") + '"'
            );
          })
          .join(" ");
        return (
          "<" +
          i.tag +
          ' class="' +
          i.classes.join(" ") +
          '"' +
          (o ? " " + o : "") +
          ">" +
          i.content +
          "</" +
          i.tag +
          ">"
        );
      }),
      !_self.document)
    )
      return _self.addEventListener
        ? (_self.addEventListener(
            "message",
            function (e) {
              var t = JSON.parse(e.data),
                a = t.language,
                r = t.code,
                i = t.immediateClose;
              _self.postMessage(n.highlight(r, n.languages[a], a)),
                i && _self.close();
            },
            !1
          ),
          _self.Prism)
        : _self.Prism;
    var r =
      document.currentScript ||
      [].slice.call(document.getElementsByTagName("script")).pop();
    return (
      r &&
        ((n.filename = r.src),
        document.addEventListener &&
          !r.hasAttribute("data-manual") &&
          ("loading" !== document.readyState
            ? window.requestAnimationFrame
              ? window.requestAnimationFrame(n.highlightAll)
              : window.setTimeout(n.highlightAll, 16)
            : document.addEventListener("DOMContentLoaded", n.highlightAll))),
      _self.Prism
    );
  })();
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism);
(Prism.languages.css = {
  comment: /\/\*[\w\W]*?\*\//,
  atrule: { pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i, inside: { rule: /@[\w-]+/ } },
  url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
  selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
  string: {
    pattern: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  property: /(\b|\B)[\w-]+(?=\s*:)/i,
  important: /\B!important\b/i,
  function: /[-a-z0-9]+(?=\()/i,
  punctuation: /[(){};:]/,
}),
  (Prism.languages.css.atrule.inside.rest = Prism.util.clone(
    Prism.languages.css
  )),
  Prism.languages.markup &&
    (Prism.languages.insertBefore("markup", "tag", {
      style: {
        pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
        lookbehind: !0,
        inside: Prism.languages.css,
        alias: "language-css",
      },
    }),
    Prism.languages.insertBefore(
      "inside",
      "attr-value",
      {
        "style-attr": {
          pattern: /\s*style=("|').*?\1/i,
          inside: {
            "attr-name": {
              pattern: /^\s*style/i,
              inside: Prism.languages.markup.tag.inside,
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": { pattern: /.+/i, inside: Prism.languages.css },
          },
          alias: "language-css",
        },
      },
      Prism.languages.markup.tag
    ));
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\w\W]*?\*\//, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 },
  ],
  string: {
    pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  "class-name": {
    pattern:
      /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /(\.|\\)/ },
  },
  keyword:
    /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(true|false)\b/,
  function: /[a-z0-9_]+(?=\()/i,
  number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.php = Prism.languages.extend("clike", {
  keyword:
    /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
  constant: /\b[A-Z0-9_]{2,}\b/,
  comment: {
    pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
    lookbehind: !0,
    greedy: !0,
  },
})),
  Prism.languages.insertBefore("php", "class-name", {
    "shell-comment": {
      pattern: /(^|[^\\])#.*/,
      lookbehind: !0,
      alias: "comment",
    },
  }),
  Prism.languages.insertBefore("php", "keyword", {
    delimiter: /\?>|<\?(?:php)?/i,
    variable: /\$\w+\b/i,
    package: {
      pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
      lookbehind: !0,
      inside: { punctuation: /\\/ },
    },
  }),
  Prism.languages.insertBefore("php", "operator", {
    property: { pattern: /(->)[\w]+/, lookbehind: !0 },
  }),
  Prism.languages.markup &&
    (Prism.hooks.add("before-highlight", function (e) {
      "php" === e.language &&
        ((e.tokenStack = []),
        (e.backupCode = e.code),
        (e.code = e.code.replace(
          /(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi,
          function (a) {
            return e.tokenStack.push(a), "{{{PHP" + e.tokenStack.length + "}}}";
          }
        )));
    }),
    Prism.hooks.add("before-insert", function (e) {
      "php" === e.language && ((e.code = e.backupCode), delete e.backupCode);
    }),
    Prism.hooks.add("after-highlight", function (e) {
      if ("php" === e.language) {
        for (var a, n = 0; (a = e.tokenStack[n]); n++)
          e.highlightedCode = e.highlightedCode.replace(
            "{{{PHP" + (n + 1) + "}}}",
            Prism.highlight(a, e.grammar, "php").replace(/\$/g, "$$$$")
          );
        e.element.innerHTML = e.highlightedCode;
      }
    }),
    Prism.hooks.add("wrap", function (e) {
      "php" === e.language &&
        "markup" === e.type &&
        (e.content = e.content.replace(
          /(\{\{\{PHP[0-9]+\}\}\})/g,
          '<span class="token php">$1</span>'
        ));
    }),
    Prism.languages.insertBefore("php", "comment", {
      markup: { pattern: /<[^?]\/?(.*?)>/, inside: Prism.languages.markup },
      php: /\{\{\{PHP[0-9]+\}\}\}/,
    }));
