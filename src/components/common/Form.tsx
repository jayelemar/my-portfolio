

import { ArrowRightIcon, MailIcon, MessageSquare, User } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const Form = () => {
  return (
    <form action='' className="flex flex-col mx-auto gap-y-4 w-full xl:relative top-[27px]">
      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row flex-1 ">
        <div className="relative flex items-center mb-2 w-full mr-4">
          <Input type="name"  id="name" placeholder="Name" className="px-8 h-[54px] rounded-2xl text-base" />
          <User className=" absolute right-6" size={20} />
        </div>
        <div className="relative flex items-center mb-2  w-full">
          <Input type="email"  id="email" placeholder="Email" className="px-8 h-[54px] rounded-2xl text-base" />
          <MailIcon className=" absolute right-6" size={20} />
        </div>
      </div>
      
      <div className="relative flex items-center mb-0 ">
        <Textarea id="name" placeholder="Type your message here" className="rounded-2xl min-h-[130px] lg:min-h-[180px] text-base  px-8" />
        <MessageSquare className=" absolute right-6 top-2" size={20} />
      </div>
      <Button className="flex items-center w-full sm:max-w-48 xl:max-w-[400px] rounded-full gap-2 ">
        Let&apos;s Talk
        <ArrowRightIcon size={20} />
      </Button>
    </form>
  )
}

export default Form