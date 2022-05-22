function EnquiryLoop(items) {
    let loopedItems = [];

    for (let i = 0; i < items.length; i++) {
        loopedItems.push(items[i]);
        if (loopedItems.length > 3) {
            break;
        }
    }
    return loopedItems;
};

export default EnquiryLoop;