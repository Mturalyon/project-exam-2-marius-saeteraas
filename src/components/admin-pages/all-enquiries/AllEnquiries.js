import EnquiryList from "./EnquiryList";
import { useEffect } from "react";

function AllEnquiries() {

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