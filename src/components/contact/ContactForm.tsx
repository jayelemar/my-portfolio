'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowRightIcon, MailIcon, MessageSquare, User } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useToast } from '../ui/use-toast';


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
  const {reset} = useForm();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      message: "",
    },
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });
    toast({
      title: `Hello ${values.name},`,
      description: `Thanks for reaching out.
      A confirmation email will be send shortly`,
    })

    try {
      const backendAPI = process.env.NEXT_PUBLIC_BACKEND_API;
      if (backendAPI) {
        try {
          const response = await fetch(backendAPI, {
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
      } else {
        console.error('Backend URL is undefined');
      }
    } catch (error) {
      console.error('Error sending email2:', error);
    }


  };

  
  return (
    <>
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col mx-auto gap-y-4 w-full xl:relative top-[27px]"
      >
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row flex-1 ">
        
        {/* Name */}
        <div className="relative flex items-center mb-2 w-full mr-4">
          <FormField 
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col justify-center items-start">
                <FormLabel 
                  className="absolute bg-background px-1 top-0 left-6 text-muted-foreground"
                >
                  Name:
                </FormLabel>
                <FormControl>
                  <Input 
                    className="px-8 h-[54px] rounded-2xl text-base " 
                    {...field}
                  />
                </FormControl>
                  <FormMessage />
              </FormItem>
            )}
          />
          <User className=" absolute right-6 bottom-4" size={20} />
        </div>

        {/* Email */}
        <div className="relative flex items-center mb-2  w-full">
          <FormField 
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col justify-center items-start">
                <FormLabel 
                  className="absolute bg-background px-1 top-0 left-6 text-muted-foreground"
                >
                  Email:</FormLabel>
                <FormControl>
                  <Input 
                    className="px-8 h-[54px] rounded-2xl text-base" 
                    {...field}
                  />
                </FormControl>
                  <FormMessage />
              </FormItem>
            )}
          />
          <MailIcon className=" absolute right-6 bottom-4" size={20} />
        </div>
        </div>

        {/* Message */}
        <div className="relative">
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
                  <FormMessage />
              </FormItem>
            )}
          />
          <MessageSquare className=" absolute right-6 top-8" size={20} />
        </div>

        <Button 
          type="submit"
          className="flex items-center w-full sm:max-w-48 xl:max-w-[400px] rounded-full gap-2 "
        >
          Let&apos;s Talk
          <ArrowRightIcon size={20} />
        </Button>
      </form>
    </Form>
    </>
  )
}

export default ContactForm