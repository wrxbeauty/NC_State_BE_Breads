const React = require('react')
const Default = require('./layouts/default')

function NotFound() {
    return (
        <Default>
            <h1>404 NOT FOUND</h1>
        </Default>
    )
}

module.exports = NotFound