import Category from "../componet/stickers/Category"
import Hero from "../componet/hero/Hero"
import Hot from "../componet/Hot/Hot"
import Partner from "../componet/Partener/Partner"
import Advantage from "../componet/Advantage/Adventage"
import Custom from "../componet/custom/Custom"
import HalfStickers from "../componet/stickers/HalfStickers"
import { useEffect } from "react"

const Home = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Hero />
      <Custom />
      <Hot />
      <Category />
      <HalfStickers />
      <Partner />
      <Advantage />
    </>
  )
}

export default Home