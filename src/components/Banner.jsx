
import HeroSlider, { Slide } from "hero-slider";


const Banner = () => {
    return (
        <div className='h-[600px] relative'>

            <HeroSlider
            slidingAnimation='left_to_right'
            orientation='horizontal'
            initialSlide={1}
            onBeforeChange={(previousSlide, nextSlide) =>
                console.log("onBeforeChange", previousSlide, nextSlide)
            }
            onChange={(nextSlide) => console.log("onChange", nextSlide)}
            onAfterChange={(nextSlide) => console.log("onAfterChange", nextSlide)}
            style={{
                backgroundColor: 'rgba(0,0,0,0.33)',
            }}
            settings={{
                slidingDuration: 250,
                slidingDelay: 1000,
                shouldAutoplay: true,
                shouldDisplayButtons: true,
                autoplayDuration: 1000,
                maxHeight: "30vh"
            }}
        >
            <Slide
                background={{
                    backgroundImageSrc: 'https://hips.hearstapps.com/hmg-prod/images/amazon-tech-products-2021-1635430982.jpg',
                    backgroundAttachment: 'fixed'
                }}
            />

            <Slide
                background={{
                    backgroundImageSrc: 'https://i.insider.com/61c371ce3bbcdd0012a06398?width=700',
                    backgroundAttachment: 'fixed'
                }}
            />

            <Slide
                background={{
                    backgroundImageSrc: 'https://reviewed-com-res.cloudinary.com/image/fetch/s--T2M-kers--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_1200/https://reviewed-production.s3.amazonaws.com/1572547548390/Reviewed100-Tech-hero-1.jpg',
                    backgroundAttachment: 'fixed'
                }}
            />
        </HeroSlider>

            <div className='absolute top-1/3 left-1/3 md:text-4xl text-2xl lg:text-7xl  font-bold text-white z-50 -translate-x-1/2 uppercase bg-[#0e0eaec7] p-3 rounded'>
                <h1>Showcase Your</h1>
                <h1>Beautiful Techs</h1>
                <h1>With beauty!</h1>
            </div>
        </div>
    )
}

export default Banner