import Category from "../componet/stickers/Category"
import Hero from "../componet/hero/Hero"
import Hot from "../componet/Hot/Hot"
import Contact from "../componet/Contact/Contact"
import Partner from "../componet/Partener/Partner"
import Advantage from "../componet/Advantage/Adventage"
import Custom from "../componet/custom/Custom"

const Home = () => {
  return (
    <div className="">
      <Hero />
      <Custom />
      <Hot />
      <Category />
      <Partner />
      <Contact />
      <Advantage />



    </div>
  )
}

export default Home