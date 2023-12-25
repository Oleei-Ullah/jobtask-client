import { useEffect } from "react"

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} - Tech Show | Showcase your Technolgies`
    }, [title])
}

export default useTitle;