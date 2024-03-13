'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowRightIcon, Check, Loader2, MailIcon, MessageSquare, User } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useToast } from '../ui/use-toast';
import { useFormSubmit } from "@/service/formServices";
import { motion } from 'framer-motion'
import { fadeIn } from "@/lib/variant";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
      message: "Invalid email format.",
  }),
  message: z.string().min(5, {
    message: "Message must be at least 5 characters.",
  }),
})


const ContactForm = () => {
  const { toast } = useToast();
  const { mutate: FormSubmitMutation, isPending, isSuccess } = useFormSubmit()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      message: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    // console.log({ values });

    try {
      const response = await fetch('api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Error sending email1:', await response.text());
      }
    } catch (error) {
      console.error('Error sending email2:', error);
    }


    toast({
      title: `Hello ${values.name},`,
      description: `Thank you for reaching out.
      A confirmation email will be send to you within a day`,
    })

    try {
      new Promise(resolve => setTimeout(resolve, 2000));

      await FormSubmitMutation(values);
      form.reset();
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  
  return (
    <>
    <Form {...form} >
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col mx-auto gap-y-4 w-full xl:relative top-[27px]"
      >
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row flex-1 gap-4 xl:gap-5 ">
        
        {/* Name */}
        <motion.div 
          variants={fadeIn('up', 1.0)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once:false, amount: 0.2}}
          className="relative flex items-center mb-2 w-full mr-4"
        >
          <FormField 
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col justify-center items-start">
                <FormLabel 
                  className="absolute bg-background px-1 top-0 left-6 text-muted-foreground z-10"
                >
                  Name:
                </FormLabel>
                <FormControl>
                  <div className='flex relative w-full'>
                  <Input 
                    className="px-8 h-[54px] rounded-2xl text-base " 
                    {...field}
                    />
                  <User className=" absolute right-6 bottom-4" size={20} />
                  </div>
                </FormControl>
                  <FormMessage className="absolute text-xs -bottom-5 left-[28px] w-full" />
              </FormItem>
            )}
          />

        </motion.div>

        {/* Email */}
        <motion.div
          variants={fadeIn('up', 1.2)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once:false, amount: 0.2}}
          className="relative flex items-center mb-2  w-full"
        >
          <FormField 
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col justify-center items-start">
                <FormLabel 
                  className="absolute bg-background px-1 top-0 left-6 text-muted-foreground z-10"
                >
                  Email:</FormLabel>
                <FormControl>
                <div className='flex relative w-full'>
                  <Input 
                    className="px-8 h-[54px] rounded-2xl text-base" 
                    {...field}
                  />
                  <MailIcon className=" absolute right-6 bottom-4" size={20} />
                </div>
                </FormControl>
                  <FormMessage className="absolute text-xs -bottom-5 left-[28px] w-full" />
              </FormItem>
            )}
          />
          
        </motion.div>
        </div>

        {/* Message */}
        <motion.div
          variants={fadeIn('up', 1.4)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once:false, amount: 0.2}}
          className="relative mb-3"
        >
          <FormField 
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col justify-center items-start">
                <FormLabel 
                  className="absolute bg-background px-1 top-0 left-6 text-muted-foreground"
                >
                  Message:</FormLabel>
                <FormControl>
                  <Textarea 
                    className="rounded-2xl min-h-[130px] lg:min-h-[180px] text-base py-5 px-8" 
                    {...field}
                  />
                </FormControl>
                  <FormMessage className="absolute text-xs -bottom-5 left-[28px] w-full" />
              </FormItem>
            )}
          />
          <MessageSquare className=" absolute right-6 top-8" size={20} />
        </motion.div>
        <motion.div
          variants={fadeIn('up', .4)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once:false, amount: 0.1}}
        >
          <Button 
            type="submit" disabled={isPending || isSuccess }
            className="flex items-center w-full sm:max-w-48 xl:max-w-[400px] rounded-full gap-2 "
          >
            {isPending ? (
              <>
                <span>Loading</span>
                <Loader2 className='animate-spin' size={20} />
              </>
            ) : isSuccess ? (
              <>
                <span>Message Sent</span>
                <Check size={20} />
              </>
            ) : (
              <>
                <span>Let&apos;s Talk</span>
                <ArrowRightIcon size={20} />
              </>
            )}
          </Button>
        </motion.div>

      </form>
    </Form>
    </>
  )
}

export default ContactForm