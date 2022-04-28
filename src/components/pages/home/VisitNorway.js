import image1 from "../../../images/norway-1.jpg";
import image2 from "../../../images/norway-2.jpg";
import image3 from "../../../images/norway-3.jpg";
import image4 from "../../../images/norway-4.jpg";

function VisitNorway() {
    return (
        <section className="home-visit-section">
            <h2>Want to see more of beautiful Norway?</h2>
            <div className="flex-mid flex-wrap image-container">
                <img src={image1} alt="display norwegian scenery" />
                <img src={image2} alt="display norwegian scenery" />
                <img src={image3} alt="display norwegian scenery" />
                <img src={image4} alt="display norwegian scenery" />
            </div>
            <div className="flex-mid">
                <a href="https://www.visitnorway.no/?gclid=Cj0KCQjw06OTBhC_ARIsAAU1yOWIPf7Soegsw7opyB6bnbcwYVnpNQNv6r7QXc8DQJZHUnmZZF_uldgaAgOLEALw_wcB&gclsrc=aw.ds" rel="noreferrer" target="_blank" className="button button-secondary">Visit Norway</a>
            </div>
        </section>
    )
};

export default VisitNorway;