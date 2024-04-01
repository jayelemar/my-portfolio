export const fadeIn = (direction:string, delay: number) => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      opacity: 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      transition: {
        type: 'tween',
        duration: 1.4,
        delay: delay,
        ease: [0.25, 0.6, 0.3, 0.8]
      },
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  }
}

export const containerVariant = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 
      duration: 0.5,
      ease: 'linear',
    }
  },
}

export const itemVariant = {
  hidden: { y: 20 , opacity: 0 },
  show: {
    y: 0 ,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [ 0.25, 0.6, 0.3, 0.8 ]
    }
  }
}


export const containerVariant2 = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: {
      staggerChildren: .4, // 
      duration: .8,
      ease: 'linear',
    }
  },
}
export const itemVariant2 = {
  hidden: { y: 20 , opacity: 0 },
  show: {
    y: 0 ,
    opacity: 1,
    transition: {
      duration: .8,
      ease: [ 0.25, 0.6, 0.3, 0.8 ]
    }
  }
}
