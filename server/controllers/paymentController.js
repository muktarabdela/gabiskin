import axios from "axios"
import * as dotenv from 'dotenv';

dotenv.config();

const CHAPA_URL = process.env.CHAPA_URL || "https://api.chapa.co/v1/transaction/initialize"

const initializePayment = async (req, res) => {
    const config = {
        Headers: {
            authorization: "CHASECK_TEST-mqxVZoVpODkw8AZYOM3obWkL0r2RDTFo"
        }
    }

    const CALLBACK_URL = "http://localhost:5173/account/65506dda05c0aa866d0af0de"

    const TEXT_REF = "tx-gabiskin-" + Date.now()

    const data = {
        amount: req.body.amount,
        currency: 'ETB',
        email: 'ato@ekele.com',
        first_name: 'Ato',
        last_name: 'Ekele',
        tx_ref: TEXT_REF,
        callback_url: CALLBACK_URL
    }
    await axios.post(CHAPA_URL, data, config)
        .then((response) => {
            res.send(response.data.data.checkout_url)
            console.log(response.data)
        })
        .catch((err) => console.log(err))

    /* res.json({res: "message", url: CALLBACK_URL}) */
}

const verifyPayment = async (req, res) => {
    await axios.get("https://api.chapa.co/v1/transaction/verify/" + req.params.id, config)
        .then((response) => {
            console.log(response)
            res.json({ message: response })
        })
        .catch((err) => {
            console.log("Payment can't be verfied", err)
            res.json({ error: err })
        })

    res.json({ message: "response", param: req.params.id })
}


export { initializePayment, verifyPayment }