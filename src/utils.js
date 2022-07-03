export const selectEventImage = event => {
	// keep image with ratio 16_9
	const image_16_9 = event.image.filter((image) => image.ratio === '16_9');
	// order images by width asc
	const image_16_9_ordered = image_16_9.sort((a, b) => a.width - b.width);
	// get first image above 300px
	return image_16_9_ordered.find((image) => image.width > 300);
};
