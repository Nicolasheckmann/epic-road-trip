export const selectEventImage = event => {
	// keep image with ratio 16_9
	const image_16_9 = event.image.filter((image) => image.ratio === '16_9');
	// order images by width asc
	const image_16_9_ordered = image_16_9.sort((a, b) => a.width - b.width);
	// get first image above 300px
	return image_16_9_ordered.find((image) => image.width > 300);
};


function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}