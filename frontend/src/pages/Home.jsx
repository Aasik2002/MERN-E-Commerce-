import ImageSlider from "../components/imageSlider";

const Home = () => {
  return (
    <>
      <ImageSlider />
      <div className="mt-12 p-8 flex flex-col items-center justify-around text-gray-900">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">Latest Collections</h1>
        <p className="text-lg text-center max-w-2xl">
          We specialize in delivering innovative tech solutions that drive business growth. Our team of experts is dedicated to providing top-notch services in web development, mobile app development, and digital marketing.
        </p>
      </div>
    </>
  )
}

export default Home