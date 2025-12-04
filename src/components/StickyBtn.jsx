import React from 'react'
import { Link } from 'react-router-dom'

export default function StickyBtn() {
    return (
        <div className='sticky-button-container'>
            <Link to={"https://formbuilder.ccavenue.com/live/icici-bank/st-johns-alumni-trust"} target='_blank'>
                <img src="/images/Ticket_Button_Website.png" alt="Ticket_Button_Website" />
            </Link>
        </div>
        <div className='sticky-button-container'>
            <Link to={"https://www.gdsons.co.in/draft/sjs/get-ticket"} target='_blank'>
                <img src="/images/Ticket_Button_Website.png" alt="Ticket_Button_Website" />
            </Link>
        </div>
    )
}
