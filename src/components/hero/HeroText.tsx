'use client';

const HeroText = () => {
  return (
    <>
      <div className="text-sm uppercase font-semibold mb-4 text-primary tracking-wide absolute top-4 xs:top-4 xl:top-6 xl:left-1 whitespace-nowrap">
        Full Stack Developer
      </div>
      <h1   className='pt-10 text-5xl xl:text-[72px] xl:leading-[80px] tracking-tight mb-4 font-bold md:max-w-lg'>
        Hello, my <span className='inline xs:hidden'><br /></span>
        name is <span className='inline md:hidden'><br /></span>
        <span className='whitespace-nowrap'>Jay Elemar</span>
      </h1>
      <p className='text-center xl:text-left text-muted-foreground text-xl mb-4 font-light max-w-lg'>
        an aspiring developer with passion for design, automation and technologies
      </p>
    </>
  )
}

export default HeroText