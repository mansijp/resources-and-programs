import tools from '../images/tools.png'; 
import webinars from '../images/webinars.png'; 
import workshops from '../images/workshops.png'; 
import articles from '../images/articles.png'; 
import { Link } from 'react-router-dom';

const Resources = () => {
    return (
        <>
            <div className="py-10 bg-gray-100" id='portfolio'>
                <h2 className="my-2 text-center text-3xl text-green-600 uppercase font-bold">Client Training Resources</h2>
                <div className='flex justify-center'>
                    <div className='w-24 border-b-4 border-green-600 mb-8'></div>
                </div>

                <div className="px-6" data-aos="fade-down" data-aos-delay="600">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        {/* Tools */}
                        <div className="flex flex-col justify-between py-4 px-4 bg-white text-gray-800 hover:scale-105 rounded-lg shadow-md transition duration-400 min-h-[40vh]">
                            <div className="m-2 text-center text-sm flex flex-col h-full">
                                <h4 className="font-semibold my-4 text-lg md:text-xl text-center mb-4 h-12 text-green-700">Tools</h4>
                                <img src={tools} alt="tools" className="w-44 md:w-48 mx-auto mb-4" />
                                <p className="text-base font-medium leading-6 mb-6">
                                    Streamline your workflow with powerful tools designed to simplify tasks and boost productivity. Achieve more, faster—with intuitive features that enhance your experience and support your success.
                                </p>
                                <div className="mt-auto flex justify-center">
                                    <Link to="/Tools" className="text-white bg-green-600 hover:bg-green-700 inline-flex items-center justify-center w-full px-6 py-3 text-lg shadow-xl rounded-xl">
                                        Check Tools
                                        <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Webinars */}
                        <div className="flex flex-col justify-between py-4 px-4 bg-white text-gray-800 hover:scale-105 rounded-lg shadow-md transition duration-400 min-h-[40vh]">
                            <div className="m-2 text-center text-sm flex flex-col h-full">
                                <h4 className="font-semibold my-4 text-lg md:text-xl text-center mb-4 h-12 text-green-700">Webinars & Expert Talks</h4>
                                <img src={webinars} alt="webinars" className="w-44 md:w-48 mx-auto mb-4" />
                                <p className="text-base font-medium leading-6 mb-6">
                                    Gain insights from thought leaders and industry experts in our "Expert Talks" series. These engaging sessions explore trends, strategies, and practical advice to help you stay ahead. Whether learning from professionals or exploring new ideas, this is your chance to grow.
                                </p>
                                <div className="mt-auto flex justify-center">
                                    <Link to="/Webinars" className="text-white bg-green-600 hover:bg-green-700 inline-flex items-center justify-center w-full px-6 py-3 text-lg shadow-xl rounded-xl">
                                        View
                                        <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Workshops */}
                        <div className="flex flex-col justify-between py-4 px-4 bg-white text-gray-800 hover:scale-105 rounded-lg shadow-md transition duration-400 min-h-[40vh]">
                            <div className="m-2 text-center text-sm flex flex-col h-full">
                                <h4 className="font-semibold my-4 text-lg md:text-xl text-center mb-4 h-12 text-green-700">Interactive Workshops</h4>
                                <img src={workshops} alt="workshops" className="w-44 md:w-48 mx-auto mb-4" />
                                <p className="text-base font-medium leading-6 mb-6">
                                    Take your skills to the next level with our hands-on workshops led by industry experts. These sessions deliver practical knowledge and real-world solutions in a collaborative space to ask questions, share ideas, and grow. Ready to get started? Let’s learn together!
                                </p>
                                <div className="mt-auto flex justify-center">
                                    <Link to="/Workshops" className="text-white bg-green-600 hover:bg-green-700 inline-flex items-center justify-center w-full px-6 py-3 text-lg shadow-xl rounded-xl">
                                        Upcoming Events
                                        <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Articles */}
                        <div className="flex flex-col justify-between py-4 px-4 bg-white text-gray-800 hover:scale-105 rounded-lg shadow-md transition duration-400 min-h-[40vh]">
                            <div className="m-2 text-center text-sm flex flex-col h-full">
                                <h4 className="font-semibold my-4 text-lg md:text-xl text-center mb-4 h-12 text-green-700">Articles</h4>
                                <img src={articles} alt="articles" className="w-44 md:w-48 mx-auto mb-4" />
                                <p className="text-base font-medium leading-6 mb-6">
                                    Stay informed with expertly written articles full of insights, tips, and trends. From helpful guides to thought-provoking commentary, our content helps you stay ahead, make smarter decisions, and explore new ideas.
                                </p>
                                <div className="mt-auto flex justify-center">
                                    <Link to="/Articles" className="text-white bg-green-600 hover:bg-green-700 inline-flex items-center justify-center w-full px-6 py-3 text-lg shadow-xl rounded-xl">
                                        Read More
                                        <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Resources;
