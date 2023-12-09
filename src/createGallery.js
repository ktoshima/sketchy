const clickPromise = (htmlElement, timeout) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			htmlElement.click();
			resolve();
		}, timeout);
	});
};

const imgUrlPromise = (id, htmlElement) => {
	return new Promise((resolve) => {
		if (htmlElement.hasAttribute('href')) {
			const parsedURL = new URL(htmlElement.href);
			resolve({id: id, imgurl: parsedURL.searchParams.get('imgurl')});
		}
		const observer = new MutationObserver(_mutations => {
			if (htmlElement.hasAttribute('href')) {
				observer.disconnect();
				const parsedURL = new URL(htmlElement.href);
				resolve({id: id, imgurl: parsedURL.searchParams.get('imgurl')});
			}
		});
		observer.observe(htmlElement, {attributeFilter: ['href']});
	});
}

const getImgUrlObj = (id, htmlElement, timeout) => {
	return clickPromise(htmlElement, timeout)
		.then(() => {
			return imgUrlPromise(id, htmlElement);
		});
}

const createGallery = (maxGalleryLen, wait_time) => {
	const tmbHtmlCollection = document.getElementsByClassName("islib");
	const htmlArray = [];
	let counter = 0
	for (let key in tmbHtmlCollection) {
		htmlArray.push(tmbHtmlCollection[key]);
		++counter;
		if (counter === maxGalleryLen) break;
	}
	return htmlArray.map((value, index) => getImgUrlObj(index, value, index*wait_time));
}

const createGalleryListener = (message) => {
	if (message.type === "create_gallery") {
		const galleryPromises = createGallery(message.maxGalleryLen, 500);
		return new Promise((resolve) => {
			Promise.all(galleryPromises)
				.then((gallery) => {
					resolve({gallery: gallery});
				});
		});
	}
	return false;
}

// make sure listener is added to the page only once
if (browser.runtime.onMessage.hasListener(createGalleryListener)) {
} else {
	browser.runtime.onMessage.addListener(createGalleryListener);
}
