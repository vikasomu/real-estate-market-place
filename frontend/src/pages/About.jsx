import React from 'react'

const About = () => {
  const handleChange=(e)=>{
    const {id,value}=e.target
    setFormData({
      ...formData,
      [id]: value
    })
  }
  return (
    <div>About</div>
  )
}

export default About