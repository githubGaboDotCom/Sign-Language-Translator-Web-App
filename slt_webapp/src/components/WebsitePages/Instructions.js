import './Instructions.css'

const Instructions = () => {
    return (
        <div className="instructions_container">
            <video src="/videos/InstructionsPageSLT.mp4" autoPlay loop muted />
            <div class="Instructions_Box_Container">
                <div class="Instructions_Box">
                    <h2>Welcome to our website, where you will have the best experience learning how to manage your time to the maximum.</h2>
                    <p>Our main objective is to help you get the most out of your time by properly recording it. We offer a simple and reliable
                    user interface to track the time you spend on your daily activities. Tracking your time can help you know which areas of 
                    your life need more attention or which prevent you from reaching all your potential.</p>
                    <p>We have prepared a set of instructions to help you become more familiar with the website and how to use it properly.</p>
                    <h3>Instructions:</h3>
                    <p>1. Start by creating an online account with us so you can have personalized use of our website and receive a weekly report 
                        of your time management. You will find on the homepage links to the "Sing up" page. Once you have created an account, you 
                        can go ahead and log in to your account with your credentials. If you forget your password, there will always be a link on 
                        the login page so you can recover your password quickly.</p>
                    <p>2. Here on our instructions page, you will find the basic steps to use your account, such as the correct way to record the 
                        time you spend on daily activities or request a weekly report with graphs showing which activities during the week consumed 
                        the most your time. All this information will help you use our website to the fullest. Likewise, you will find instructions 
                        on how to provide us with some feedback and help us improve our services, as well as information on how to contact us with 
                        any questions.</p>
                </div>
            </div>
        </div>
    );
}

export default Instructions;