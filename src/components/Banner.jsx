
import HeroSlider, { Slide } from "hero-slider";
import { useNavigate } from "react-router-dom";


const Banner = () => {
    const navigate = useNavigate();
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
                    backgroundImageSrc: 'https://www.shutterstock.com/image-vector/business-planning-task-management-concept-260nw-1987578881.jpg',
                    backgroundAttachment: 'fixed'
                }}
            />

            <Slide
                background={{
                    backgroundImageSrc: 'https://i0.wp.com/getflowdotcom.wpcomstaging.com/wp-content/uploads/2020/05/task-management-tips.jpg?fit=1255%2C835&ssl=1',
                    backgroundAttachment: 'fixed'
                }}
            />

            <Slide
                background={{
                    backgroundImageSrc: 'https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/5/main/1SvzKctRCi8bwB0QPdOZkBP0pRhsOqZpl0wjs6y0.png',
                    backgroundAttachment: 'fixed'
                }}
            />
        </HeroSlider>

            <div className='absolute top-1/3 left-1/3 md:text-4xl text-2xl lg:text-7xl  font-bold text-white z-50 -translate-x-1/2 uppercase bg-[#0e0eaec7] p-3 rounded'>
                <h1>Showcase Your</h1>
                <h1>Beautiful Techs</h1>
                <h1>With beauty!</h1>

                <button onClick={() => navigate('/dashboard')} className="text-center mx-auto my-3 inline-block px-2 rounded-e-md min-w-[200px]">
                <h1 className="bg-gradient-to-r px-2 py-1 rounded from-blue-600 via-green-500 to-indigo-400 text-black font-bold inline-block text-2xl font-lora text-center">Lets Explore</h1>
            </button>
            </div>
        </div>
    )
}

export default Banner