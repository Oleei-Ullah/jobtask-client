/* eslint-disable react/prop-types */


const SectionHeading = ({heading}) => {
    return (
        <div className="flex items-center justify-center py-5">
            <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text font-bold inline-block text-5xl font-lora text-center">{heading}</h1>
        </div>
    )
}

export default SectionHeading