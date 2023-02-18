const React = require('react')

function Default(html) {
  return (
    <html>
      <head>
        <title>{html.title || 'Default'}</title>
      </head>
      <body>
        <h1>HTML Rendered!</h1>
        <div id="asdf" className="container">
            {html.children}
        </div>
      </body>
    </html>
  )
}

module.exports = Default