import './About.css'

const About = () => {
    return (
        <div className="about_container">
            <video src="/videos/AboutPageSLT.mp4" autoPlay loop muted />
            <div class="About_Container">
                <div class="About_Me">
                    <img id="My_Picture" src="/images/photo.jpeg" alt="My_photo" />
                    <div class="About_paragraphs">
                        <h3>About Us</h3>
                        <blockquote><i>"We're changing the world with technology"</i></blockquote>
                        <p>Technology advances by leaps and bounds, and likewise influences the lives of millions 
                            of people every day. That is why I join this great technological advance, and contribute 
                            with my passion for software. <br/>
                            I am a Computer Science student in my final year, freelance software developer, and 
                            IT specialist. My goal is to provide high quality software for the benefit of each person, 
                            and this is the main reason why I make this free software available so that anyone who 
                            wants it can benefit from its excellent use. I hope you can have the best experience 
                            using it, and that it can help you in your daily life. <br/>
                            On this same page you will find a section to provide feedback and suggestions about this 
                            website. I always look for opportunities to improve and be able to provide the best service. 
                            Without a doubt, your suggestions will give us a better perspective on how to provide a 
                            quality service.<br/>
                            <br/>
                            Thank you!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;