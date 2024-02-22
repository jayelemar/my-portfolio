import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
  <section>
    <div className="container flex justify-center items-center min-h-[82vh] flex-col">
        <div className="flex flex-row justify-center items-center gap-2">
          <Loader2 size={20} className='animate-spin text-primary '/>
          <h2 className="text-xl text-primary flex gap-1">
            Loading
            <span className='animate-bounce custom-bounce-delay-1'>.</span>
            <span className='animate-bounce custom-bounce-delay-2'>.</span>
            <span className='animate-bounce custom-bounce-delay-3'>.</span>
          </h2>
        </div>
    </div>
  </section>
  )
}

export default Loading