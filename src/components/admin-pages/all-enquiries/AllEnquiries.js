import EnquiryList from "./EnquiryList";
import { useEffect } from "react";
import RedirectPage from "../redirectPage";

function AllEnquiries() {

    RedirectPage();

    useEffect(() => {
        document.title = `Holidaze | Enquiries`;
    }, []);

    return (
        <main>
            <div className="wrapper">
                <EnquiryList />
            </div>
        </main>
    )
};

export default AllEnquiries;