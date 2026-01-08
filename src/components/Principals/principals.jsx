import React from 'react'
import useFancybox from '../../helper/image_zoom';

export default function Principals() {
    const [fancyboxRef] = useFancybox({
        Carousel: {
            infinite: true,
        },
        zoomEffect:true,
    });
    const princpals_list = [
        {
            id: 1,
            name: "Fr. Aurelius",
            uri: "/images/principals/Fr.Aurelius_1963-1969.png"
        },
        {
            id: 2,
            name: "Fr. Xavier Pinto",
            uri: "/images/principals/Fr.XavierPinto_1969-1974.png"
        },
        {
            id: 3,
            name: "Fr. Joseph Puthupally",
            uri: "/images/principals/Fr.JosephPuthupally_1974-1984.png"
        },
        {
            id: 4,
            name: "Fr. Peter Colaco",
            uri: "/images/principals/Fr.PeterColaco_1984-1988.png"
        },
        {
            id: 5,
            name: "Fr. Jacob Mendonca",
            uri: "/images/principals/Fr.JacobMendonca_1989-1991.png"
        },
        {
            id: 6,
            name: "Fr. Lawrence Mendonca",
            uri: "/images/principals/Fr.LawrenceMendonca_1991-2001.png"
        },
        {
            id: 7,
            name: "Fr. David Vazapally",
            uri: "/images/principals/Fr.DavidVazapally_2001-2008.png"
        },
        {
            id: 8,
            name: "Fr. Susai Raj",
            uri: "/images/principals/Fr.SusaiRaj_2008-2018.png"
        },
        {
            id: 9,
            name: "Fr. Louis Braggs",
            uri: "/images/principals/Fr.LouisBraggs_2018-2022.png"
        },
        {
            id: 10,
            name: "Fr. Guru Santharaj",
            uri: "/images/principals/Fr.GuruSantharaj_2022-.png"
        },
    ]
    return (
        <section className="sectionContainer">
            <div className="container">
                <div className="title">
                    <h1 className="tl">Our Principals</h1>
                </div>
                <div className="row row-gap-4" ref={fancyboxRef}>
                    {
                        princpals_list.map((data) => (
                            <div className="col-lg-3 col-md-4 col-6" data-fancybox="gallery" data-src={data.uri} data-thumb-src={data.uri} data-caption={data.name}>
                                <div key={data.name} className="principals">
                                    <img src={data.uri} alt={data.name} loading="lazy" />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
