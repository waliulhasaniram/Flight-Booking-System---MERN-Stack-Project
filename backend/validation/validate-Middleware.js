const validateRegister =(schema)=> async(req, res, next)=> {
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        next()
    } catch (err) {
        const status = 422
        const message = "fill the a input"
        const extraMessage = err.errors[0].message
        
        const error = {status, message, extraMessage}
        res.status(400).json({error})
    }
}

const validateFlightAdd =(schema)=> async(req, res, next)=>{
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        next()
    } catch (err) {
        const status = 422
        const message = "fill the a input"
        const extraMessage = err.errors[0].message
        
        const error = {status, message, extraMessage}
        res.status(400).json({error})
    }
}

module.exports = { validateRegister, validateFlightAdd }