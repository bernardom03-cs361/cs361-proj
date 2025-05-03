import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import Modal from "./Modal"

export default function Layout() {
    const [openModal, setOpenModal] = useState(null); // 'tutorial', 'about', or null

    const closeModal = () => setOpenModal(null);
  
    const renderModalContent = () => {
      switch (openModal) {
        case 'tutorial':
            return (
                <>
                    <h2>Tutorial</h2>
                    <p>Welcome to Real or Edited, the daily challenge game where your job is to spot subtle edits in real wikipedia articles. Each day, we pull new articles from Wikipedia and we show you the first few sentences it.</p>
                    <p>But the catch is...</p>
                    <p>An AI has made slight informational changes to part of the paragraph-- altering dates, names, facts, and phrasing. Your challenge is to read the paragraph carefully and identify which parts have been edited</p>
                    <p>Start by reading both paragraphs closely. Look for mistakes and select which of the two paragraphs you think is the real one. Once you are confident, submit your answer and we'll show whether you got it right.</p>
                    <p>Finish all 5 rounds and see how well you did. Share online and with your friends, and come back again to see how well you can improve!</p>
                </>
            );
        case 'about':
            return (
                <>
                    <h2>About</h2>
                    <p>Hi! I am Bernardo, and I'm the creator of Real or Edited, a project built to mix learning with fun. I have always been obsessed with daily games and wanted to create one to combat news literacy online.</p>
                    <p>I've always been fascinated with how information spreads-- and how easy it is to miss small changes in the things we read. This game spawned from that curiosity</p>
                    <p>I wanted to build something that encourages players to think critically, slow down, and really analyze what they are reading. By blending real facts with slight edits, this site goves you a chance to test your knowledge/literacy, and maybe learn somethings new along the way</p>
                    <p>Whether you're hear to sharpen your attention to detail, play a fun trivia game, or you are just curious about how AI can subtly change what's true, I am glad you stopped by.</p>
                    <p></p>
                </>
            );
        default:
            return null;
      }
    };

    return (
        <div className="site-wrapper">
            <Header onTutorialClick={() => setOpenModal('tutorial')} onAboutClick={() => setOpenModal('about')} />
            <div className='main-container'>
                <Outlet />
                <Modal isOpen={openModal !== null} onClose={closeModal}>
                    {renderModalContent()}
                </Modal>
            </div>
            <Footer />
        </div>
    )
}