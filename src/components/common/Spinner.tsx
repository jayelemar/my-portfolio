import { Loader2 } from 'lucide-react'
import React from 'react'

const Spinner = () => {
  return (
    <div className="container flex justify-center items-center w-full h-full ">
        <div className="flex justify-center items-center">
          <Loader2 size={30} className='animate-spin text-primary '/>
        </div>
    </div>
  )
}

export default Spinner