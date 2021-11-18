'use strict'

const Portal = require('/lib/xp/portal')
const Thymeleaf = require('/lib/thymeleaf')

exports.get = () => {
    
	const view = resolve('content-type-manager.html')

	const model = {}

	return { body: Thymeleaf.render(view, model) }
}