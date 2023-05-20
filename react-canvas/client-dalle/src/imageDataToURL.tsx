const imageDataToURL = (imageData: ImageData): string => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
        throw new Error('Canvas context is not supported.');
    }

    canvas.width = imageData.width;
    canvas.height = imageData.height;
    context.putImageData(imageData, 0, 0);

    return canvas.toDataURL();
};

export { imageDataToURL };
