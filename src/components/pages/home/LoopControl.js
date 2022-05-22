function LoopControl(items, category) {
    let loopedItems = [];

    for (let i = 0; i < items.length; i++) {
        if (items[i].categories[0].name === `${category}`) {
            loopedItems.push(items[i]);
            if (loopedItems.length > 3) {
                break;
            }
        }
        else {
            continue;
        }
    };
    return loopedItems;
}

export default LoopControl;