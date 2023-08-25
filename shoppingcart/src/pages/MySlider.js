import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image from '../images/download.jpg';
import '../style/slider.css';


function MySlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const imageStyles = {
        width: '100%',
        height: 'auto',
    };

    return (
        <Slider {...settings}>
            <div className="image-container">
                <img src={image} alt="Opening Image" className="image" style={imageStyles} />
                <div className="overlay"></div>

            </div>
            <div className="image-container">
                <img src={image} alt="Opening Image" className="image" />
                <div className="overlay"></div>

            </div>
            <div className="image-container">
                <img src={image} alt="Opening Image" className="image" />
                <div className="overlay"></div>

            </div>
        </Slider>
    );
}

export default MySlider;
