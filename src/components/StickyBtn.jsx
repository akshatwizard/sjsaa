import React from 'react'
import { Link } from 'react-router-dom'

export default function StickyBtn() {
    return (
        <div className='sticky-button-container'>
            <Link to={"https://gdsons.co.in/draft/sjs/sites/default/files/2025-12/TicketsList.pdf"} target='_blank'>
                <img src="/images/DownloadTicketsList.png" alt="Ticket_Button_Website11" />
            </Link>
            <Link to={"https://formbuilder.ccavenue.com/live/icici-bank/st-johns-alumni-trust"} target='_blank'>
                <img src="/images/Ticket_Button_Website.png" alt="Ticket_Button_Website" />
            </Link>


        </div>
    )
}
