'use client';
import { useEffect, useState } from 'react'

const useScrollProgress = () => {
  const [completion, setCompletion] = useState(0)

  useEffect(() => {
    const updateOnScrollCompletion = () =>  {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;

      if (scrollHeight) {
        const rawCompletion = (currentProgress / scrollHeight) * 100;
        const truncatedCompletion = Math.floor(rawCompletion);
        setCompletion(truncatedCompletion);
      }
    }

    // event
    window.addEventListener('scroll', updateOnScrollCompletion);
    // clear event
    return () => window.removeEventListener('scroll', updateOnScrollCompletion);
  }, [])
  

  return (
    completion
  )
}

export default useScrollProgress